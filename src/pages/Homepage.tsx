import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";

interface DataItem {
  id: number;
  title: string;
}

const Homepage = () => {
  const navigate = useNavigate();
  const [datas, setDatas] = useState<DataItem[]>([]);
  const [search, setSearch] = useState<string>("");
  const debounceSearch = useDebounce(search, 500);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setDatas(response.data);
      } catch (error) {
        console.log("Error fetch data", error);
      }
    };
    fetchData();
  }, []);

  const handleClickItem = (id: number) => {
    navigate(`/detail/${id}`);
  };

  const filteredData = useMemo(() => {
    return datas.filter((item) =>
      item.title.toLowerCase().includes(debounceSearch.toLowerCase())
    );
  }, [debounceSearch, datas]);

  return (
    <div style={{ padding: "20px" }}>
      <div className="">
        <input
          type="text"
          placeholder="Search title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div style={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
        {filteredData.map((item) => (
          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexDirection: "column",
              cursor: "pointer",
            }}
            onClick={() => handleClickItem(item.id)}
          >
            <span>{item.id}</span>
            <span>{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
