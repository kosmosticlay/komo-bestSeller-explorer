"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "../../../../styles/category.module.css";
import { CATEGORY_API_URL } from "../../../constants";
import Link from "next/link";
import Loading from "./loading";

interface IBuyLink {
  name: string;
  url: string;
}

interface IBookItem {
  amazon_product_url: string;
  author: string;
  book_image: string;
  buy_links: IBuyLink[];
  description: string;
  primary_isbn13: string;
  publisher: string;
  rank: number;
  rank_last_week: number;
  title: string;
}

async function getBookList(category: string) {
  const response = await fetch(`${CATEGORY_API_URL}/${category}`);
  const json = await response.json();
  return json;
}

function CategoryPage() {
  const [category, setCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const path = usePathname();

  useEffect(() => {
    const loadCategory = async () => {
      const categoryData = await getBookList(path.slice(6));
      setCategory(categoryData);
      setIsLoading(false);
    };

    loadCategory();
  }, [path]);

  if (isLoading) {
    return <Loading />;
  }

  // top 3
  const topBooks = category?.results.books.slice(0, 3);
  // 나머지 리스트
  const otherBooks = category?.results.books.slice(3);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {category ? `#${category?.results.display_name}` : null}
      </h1>
      <div className={styles.main}>
        <ul className={styles.bookTopList}>
          {topBooks?.map((bookItem: IBookItem, index) => (
            <div
              className={`${styles.bookItemWrapper} ${styles.topBookItemWrapper}`}
              key={bookItem.primary_isbn13 + index} // 변경된 부분
            >
              <li
                className={styles.bookItem}
                id={bookItem.primary_isbn13}
                key={bookItem.primary_isbn13}
              >
                <div className={styles.bookImage}>
                  <img
                    className={styles.bookImage__cover}
                    src={`${bookItem.book_image}`}
                    alt="Book Image"
                  />
                  <div className={styles.bookImage__rankChange}>
                    {bookItem.rank >= bookItem.rank_last_week ? (
                      <img src="/arrow-up.png" alt="Rank increased" />
                    ) : (
                      <img src="/arrow-down.png" alt="Rank decreased" />
                    )}
                    <div className={styles.bookImage__rankNumber}>
                      {bookItem.rank > bookItem.rank_last_week
                        ? `+${bookItem.rank - bookItem.rank_last_week}`
                        : bookItem.rank === bookItem.rank_last_week
                        ? "-"
                        : `-${bookItem.rank_last_week - bookItem.rank}`}
                    </div>
                  </div>
                </div>

                <div className={styles.bookInfo}>
                  <h2 className={styles.bookInfo__title}>{bookItem.title}</h2>
                  <div className={styles.bookInfo__details}>
                    <span className={styles.bookInfo__author}>
                      {bookItem.author ? `by ${bookItem.author}` : null}
                    </span>
                    <p className={styles.bookInfo__description}>
                      {bookItem.description
                        ? `"${bookItem.description}"`
                        : null}
                    </p>
                    <Link
                      className={styles.bookInfo__buyLink}
                      href={bookItem.amazon_product_url}
                    >
                      To Buy
                    </Link>
                  </div>
                </div>
              </li>
            </div>
          ))}
        </ul>
        <ul className={styles.bookList}>
          {otherBooks?.map((bookItem: IBookItem, index) => (
            <div
              className={styles.bookItemWrapper}
              key={bookItem.primary_isbn13 + index} // 변경된 부분
            >
              <li
                className={styles.bookItem}
                id={bookItem.primary_isbn13}
                key={bookItem.primary_isbn13}
              >
                <div className={styles.bookImage}>
                  <img
                    className={styles.bookImage__cover}
                    src={`${bookItem.book_image}`}
                    alt="Book Image"
                  />
                  <div className={styles.bookImage__rankChange}>
                    {bookItem.rank >= bookItem.rank_last_week ? (
                      <img src="/arrow-up.png" alt="Rank increased" />
                    ) : (
                      <img src="/arrow-down.png" alt="Rank decreased" />
                    )}
                    <div className={styles.bookImage__rankNumber}>
                      {bookItem.rank > bookItem.rank_last_week
                        ? `+${bookItem.rank - bookItem.rank_last_week}`
                        : bookItem.rank === bookItem.rank_last_week
                        ? "-"
                        : `-${bookItem.rank_last_week - bookItem.rank}`}
                    </div>
                  </div>
                </div>
                <div className={styles.bookInfo}>
                  <h2 className={styles.bookInfo__title}>{bookItem.title}</h2>
                  <div className={styles.bookInfo__details}>
                    <span className={styles.bookInfo__author}>
                      {bookItem.author ? `by ${bookItem.author}` : null}
                    </span>
                    <p className={styles.bookInfo__description}>
                      {bookItem.description
                        ? `"${bookItem.description}"`
                        : null}
                    </p>
                    <Link
                      className={styles.bookInfo__buyLink}
                      href={bookItem.amazon_product_url}
                    >
                      To Buy
                    </Link>
                  </div>
                </div>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CategoryPage;
