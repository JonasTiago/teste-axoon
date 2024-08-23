import { createServer } from 'node:http'
import { spawn } from 'node:child_process'
import axios from 'axios'
import { url } from 'node:inspector';


createServer(async (request, response) => {
  const BASE_URL = 'http://127.0.0.1';
  // const API_URL = '/archive/media/LAPTOP-3UEDE0C4/DeviceIpint.3/SourceEndpoint.video:0:0/20240820T113623.590000?exp=20240821T100919&speed=1&nonce=4&hmac=YZoGIZTQidRMBRj88HojOLjdv2Q';
  const API_URL =   request.url
  const headers = {
    'Access-Control-Allow-Origin': "*",
    'Access-Control-Allow-Methods': "*",
  }
  if(request.method === 'OPTIONS') {
    response.writeHead(204, headers)
    response.end()
    return;
  }

  response.writeHead(200, {
    'Content-Type': 'video/mp4'
  });

  try {
    // Fetch the video stream from the API
    console.log(`${BASE_URL}${API_URL}`)
    const streamResponse = await axios.get(`${BASE_URL}${API_URL}`, {
      auth: {
        username: 'root',
        password: 'Big4dev2024',
      },
      responseType: 'stream',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache',
      }
    });

    const ffmpegProcess = spawn('ffmpeg', [
      '-i', 'pipe:0',
      '-f', 'mpeg',
      '-vcodec', 'h264',
      '-acodec', 'aac',
      '-movflags', 'frag_keyframe+empty_moov+default_base_moof',
      '-b:v', '1500k',
      '-maxrate', '1500k',
      '-bufsize', '1000k',
      '-f', 'mp4',
      '-vf', "monochrome",
      'pipe:1'
    ], {
      stdio: ['pipe', 'pipe', 'pipe']
    });

    // Pipe the video stream to ffmpeg stdin
    streamResponse.data.pipe(ffmpegProcess.stdin);

    ffmpegProcess.stderr.on('data', msg => console.log(msg.toString()));

    // Pipe ffmpeg stdout to the HTTP response
    ffmpegProcess.stdout.pipe(response);
    
    request.once('close', () => {
      ffmpegProcess.stdout.destroy();
      ffmpegProcess.stdin.destroy();
      console.log('disconnected!', ffmpegProcess.kill());
    });
  } catch (error) {
    console.error('Error fetching video stream:', error);
    response.writeHead(500, { 'Content-Type': 'text/plain' });
    response.end('Error fetching video stream');
  }
})
.listen(3000, () => console.log('Server is running at 3000'));
