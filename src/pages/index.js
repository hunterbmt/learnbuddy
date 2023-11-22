import React, { useState, useEffect, useRef } from "react"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"
import Message from "../components/message";
import getTranscript from "./transcript";

let scrollSize = 0;
const IndexPage = () => {
  const [items, setItems] = useState([]);
  const [autoScroll, setAutoScroll] = useState(true);

  const appendItem = (item) => {
    items.push(item);
    setItems([...items])
  }
  useEffect(() => {
    const fetchData = async () => {
      const conversation = getTranscript().split(/([A-Z][A-Za-z0-9-]*:\s[^]+?(?=[A-Z][A-Za-z0-9-]*:|$)|[A-Z][A-Za-z0-9-]*:)/).filter(Boolean);
      // Simulating a 5-second delay for each item
      const finalConversation = [];
      conversation.map((item, index) => {
        if (item.includes('**Meeting Minutes')) {
          const actualContent = item + conversation[index+1].trim() +  conversation[index+2].trim()
          finalConversation.push(actualContent)
        } if (!item.includes('Summary:') && item.indexOf("**") !== 0) {
          finalConversation.push(item)
        }
      })
      finalConversation.map(async (item, index) => {
        console.log(item);
        setTimeout(() => {
          appendItem(item);
        }, 5000 * index)
      })
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Check if the user has manually scrolled up
      const isScrolledUp = window.scrollY + window.innerHeight < document.documentElement.offsetHeight - 500;

      // Disable auto-scroll if the user has scrolled up
      setAutoScroll(!isScrolledUp);
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Scroll down to the bottom when content changes
    if (window && autoScroll) {
      setTimeout(() => {
        window.scrollTo({
          top: scrollSize - 100,
          behavior: 'smooth', // Optional: Add smooth scrolling animation
        });
        scrollSize = document.body.scrollHeight;
      }, 500)
    }
  }, [items, autoScroll]);

  return (
    <Layout>
      <div className={styles.textCenter}>
        <StaticImage
          src="../images/example.png"
          loading="eager"
          width={64}
          quality={95}
          formats={["auto", "webp", "avif"]}
          alt=""
          style={{ marginBottom: `var(--space-3)` }}
        />
        <h1>
          Welcome to <b>Venture AI!</b>
        </h1>
        {items.map((item, index) => <Message key={index} msg={item} />)}
      </div>
    </Layout>
  )
}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage
