import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface DetailData {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const Detailpage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [detail, setDetail] = useState<DetailData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        setDetail(response.data);
      } catch (error) {
        console.log("Error fetch data", error);
      }
    };
    fetchData();
  }, [id]);

  if(!detail) return <span>Loading...</span>

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h2>{detail?.userId}</h2>
        <h2>{detail?.id}</h2>
        <span>{detail?.title}</span>
        <span>{detail?.body}</span>
      </div>
      <button onClick={() => navigate(-1)}>Go back</button>
    </div>
  );
};

export default Detailpage;
