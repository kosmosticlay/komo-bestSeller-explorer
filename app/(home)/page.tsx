"use client";

import { useState, useEffect } from "react";
import { API_URL } from "../constants";
import styles from "../../styles/home.module.css";
import Link from "next/link";
import Loading from "./loading";

async function getLists() {
  const response = await fetch(API_URL);
  const json = await response.json();
  return json;
}

interface IListItem {
  list_name: string;
  display_name: string;
  list_name_encoded: string;
  oldest_published_date: string;
  newest_published_date: string;
  updated: string;
}

export default function HomePage() {
  const [lists, setLists] = useState<IListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    const fetchLists = async () => {
      setIsLoading(true);
      const fetchedLists = await getLists();
      setLists(fetchedLists.results);
      setIsLoading(false);
    };
    fetchLists();
  }, []);

  const toggleFilter = () => {
    setIsFiltered(!isFiltered);
    if (!isFiltered) {
      const sortedLists = [...lists].sort((a, b) =>
        a.display_name.localeCompare(b.display_name)
      );
      setLists(sortedLists);
    } else {
      getLists().then((fetchedLists) => setLists(fetchedLists.results));
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.title}>The New York Times Best Seller list</h1>
      <div
        className={styles.filterBtn}
        style={{ backgroundColor: isFiltered ? "#DF9E9E" : "#b5e4e1" }}
        onClick={toggleFilter}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
          />
        </svg>
        {isFiltered ? " Default Order →" : " Alphabetical Order →"}
      </div>
      <ul className={styles.categoryList}>
        {lists.map((item) => (
          <li
            id={item.list_name_encoded}
            key={item.list_name_encoded}
            className={styles.categoryItem}
          >
            <Link href={`/list/${item.list_name_encoded}`}>
              {item.display_name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
