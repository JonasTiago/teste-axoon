import React, { useEffect, useState } from "react";
import "./EventPage.css";
import { useLocation } from "react-router-dom";
import { formatDate, reverseFormatDate } from "../../ultils/formatData.ts";
import axios from "axios";

const EventPage = () => {
  const location = useLocation();
  const event = location.state;

  const [eventBegin, setEventBegin] = useState(formatDate(event.begin));
  const [eventEnd, setEventEnd] = useState(formatDate(event.end));
  const [seconds, setSeconds] = useState(
    String(new Date(event.begin).getSeconds("00"))
  );
  const [videoUrl, setVideoUrl] = useState("");
  const [videoLoading, setVideoLoading] = useState(false);
  const [uuid, setUuid] = useState("");
  const [loadingStatus, setLoadingStatus] = useState("");
  const [exportData, setExportData] = useState({});

  const API_URL = process.env.REACT_APP_BACK_END_URL;

  useEffect(() => {
    const fetchStreamData = async () => {
      try {
        const response = await fetch(
          `${API_URL}/events/${reverseFormatDate(eventBegin)}?videoSourceid=${
            event.videosourceid
          }`
        );

        // Verifica se a resposta foi bem-sucedida
        if (response.ok) {
          const getUuid = response.headers.get("X-Stream-UUID");
          setUuid(getUuid);
          // setUuid(uuid); // Obtém o UUID dos cabeçalhos

          // Define a URL do vídeo (adiciona o UUID à URL, se necessário)
          setVideoUrl(
            `${API_URL}/events/${reverseFormatDate(eventBegin)}?videoSourceid=${
              event.videosourceid
            }`
          );
        } else {
          console.error("Erro ao buscar o stream:", response.status);
        }
      } catch (error) {
        console.error("Erro ao buscar o stream:", error);
      }
    };

    fetchStreamData();
  }, [eventBegin, event.videosourceid]);

  const handlePlayClick = () => {
    try {
      setVideoLoading(true);

      // console.log(eventBegin);
      // console.log(reverseFormatDate(eventBegin.replace("T", " ")));

      // const [datePart, timePart] = eventBegin.split("T");
      // const [year, month, day] = datePart.split("-");
      // const [hours, minutes] = timePart.split(":");

      // const currentDate = new Date();
      // const milliseconds = String(currentDate.getMilliseconds()).padStart(
      //   3,
      //   "0"
      // );
      // const formattedDateTime = `${year}${month}${day}T${hours}${minutes}${seconds}.${milliseconds}000`;

      setVideoUrl(
        `${API_URL}/events/${reverseFormatDate(
          eventBegin.replace("T", " ")
        )}?videoSourceid=${event.videosourceid}`
      );
    } catch (error) {
      console.error("Error parsing date:", error);
    } finally {
      setVideoLoading(false);
    }
  };

  const generateSecondsOptions = () => {
    const options = [];
    for (let i = 0; i < 60; i += 1) {
      const value = i.toString().padStart(2, "0"); // Garante que seja uma string de dois dígitos
      options.push(
        <option key={value} value={value}>
          {value}
        </option>
      );
    }
    return options;
  };

  const finallyStream = async () => {
    const selectFInalStream = await axios.get(
      `${API_URL}/events/stop/${uuid}?videoSourceid=${event.videosourceid}`
    );
    console.log(formatDate(selectFInalStream.data));
    setEventEnd(formatDate(selectFInalStream.data));
    setVideoUrl(null);
  };

  const handleExportClick = async () => {
    try {
      // Requisição inicial para iniciar a exportação
      const initialExport = await axios.post(
        `${API_URL}/events/export/${reverseFormatDate(
          eventBegin
        )}/${reverseFormatDate(eventEnd)}?videoSourceid=${event.videosourceid}`,
        {
          format: "mp4",
          tsformat: "%B %Y",
        }
      );

      // Verifique se a exportação foi bem-sucedida
      if (initialExport && initialExport.data) {
        const exportId = initialExport.data.export_id;
        console.log("Export ID:", exportId);

        setLoadingStatus("exportando");

        // Função para verificar o status da exportação
        const checkExportStatus = async (exportId) => {
          try {
            const response = await axios.get(
              `${API_URL}/events/status/${exportId}`
            );

            if (response.data.state === 2) {
              console.log("Export completed");
              clearInterval(intervalId); // Para o intervalo quando a exportação é concluída
              setLoadingStatus("baixando");
              setExportData(response.data); // Definir os dados exportados

              // Aqui, você pode adicionar a lógica de download ou fornecer o link para o usuário baixar
            } else {
              console.log("Export in progress...");
            }
          } catch (error) {
            console.error("Error checking export status:", error);
            clearInterval(intervalId); // Interrompe a checagem se ocorrer um erro
          }
        };

        // Verifica o status da exportação a cada 5 segundos
        const intervalId = setInterval(
          async () => await checkExportStatus(exportId),
          5000
        );
      } else {
        console.error("Export initiation failed, no data returned.");
      }
    } catch (error) {
      console.error("Error initiating export:", error);
    }
  };

  const handleDownloadClick = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/events/download/${exportData.id}?fileName=${exportData.files[0]}`,
        {
          responseType: "blob", // Define que a resposta será um blob
        }
      );

      // Cria um URL para o arquivo baixado
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", exportData.files[0]); // Define o nome do arquivo
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Remove o link após o download
      await axios.delete(`${API_URL}/events/delete/${exportData.id}`); // Exclui o arquivo do servidor
    } catch (error) {
      console.error("Error downloading the video:", error);
    }
  };

  return (
    <div className="event-page">
      <div className="camera-stream">
        <h2>
          Moment:
          <br />
          inicio : {formatDate(event.begin)}
          <br /> final : {formatDate(event.end)}
        </h2>
        <input
          type="datetime-local"
          value={eventBegin}
          onChange={(e) => setEventBegin(e.target.value)}
          min={formatDate(event.begin)}
          max={formatDate(event.end)}
        />
        <select value={seconds} onChange={(e) => setSeconds(e.target.value)}>
          {generateSecondsOptions()}
        </select>
        <button onClick={handlePlayClick} disabled={videoLoading}>
          {videoLoading ? "Loading..." : "Play"}
        </button>
        <video
          controls
          autoPlay
          key={videoUrl}
          style={{ display: videoUrl ? "block" : "none" }}
          onEnded={() => console.log("Stream ended")}
          onError={() => console.log("Error in stream")}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <br />
        <button onClick={finallyStream}>Finalizar nesse ponto</button>
      </div>
      <div className="event-export">
        <h2>Exportação:</h2>
        <p>
          Inicio: <b>{eventBegin}</b>
        </p>
        <p>
          Fim: <b>{eventEnd}</b>
        </p>
        <br />
        <button onClick={handleExportClick}>Iniciar exportação</button>
        {loadingStatus === "exportando" && <p>Exportando...</p>}
        <br />
        <br />
        {loadingStatus === "baixando" && (
          <button onClick={handleDownloadClick}>Baixar</button>
        )}
      </div>
    </div>
  );
};

export default EventPage;
