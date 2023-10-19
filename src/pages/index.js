import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"
import Output from "./output.json";
import Collapsible from 'react-collapsible';
import { JSONTree } from 'react-json-tree';


const links = [
  {
    text: "Tutorial",
    url: "https://www.gatsbyjs.com/docs/tutorial",
    description:
      "A great place to get started if you're new to web development. Designed to guide you through setting up your first Gatsby site.",
  },
  {
    text: "Examples",
    url: "https://github.com/gatsbyjs/gatsby/tree/master/examples",
    description:
      "A collection of websites ranging from very basic to complex/complete that illustrate how to accomplish specific tasks within your Gatsby sites.",
  },
  {
    text: "Plugin Library",
    url: "https://www.gatsbyjs.com/plugins",
    description:
      "Learn how to add functionality and customize your Gatsby site or app with thousands of plugins built by our amazing developer community.",
  },
  {
    text: "Build and Host",
    url: "https://www.gatsbyjs.com/cloud",
    description:
      "Now you’re ready to show the world! Give your Gatsby site superpowers: Build and host on Gatsby Cloud. Get started for free!",
  },
]

const samplePageLinks = [
  {
    text: "Page 2",
    url: "page-2",
    badge: false,
    description:
      "A simple example of linking to another page within a Gatsby site",
  },
  { text: "TypeScript", url: "using-typescript" },
  { text: "Server Side Rendering", url: "using-ssr" },
  { text: "Deferred Static Generation", url: "using-dsg" },
]

const moreLinks = [
  { text: "Join us on Discord", url: "https://gatsby.dev/discord" },
  {
    text: "Documentation",
    url: "https://gatsbyjs.com/docs/",
  },
  {
    text: "Starters",
    url: "https://gatsbyjs.com/starters/",
  },
  {
    text: "Showcase",
    url: "https://gatsbyjs.com/showcase/",
  },
  {
    text: "Contributing",
    url: "https://www.gatsbyjs.com/contributing/",
  },
  { text: "Issues", url: "https://github.com/gatsbyjs/gatsby/issues" },
]

const IndexPage = () => (
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
        Welcome to <b>Learn Buddy!</b>
      </h1>
    </div>
    <div style={{display: "flex", flexDirection: "column"}}>
      <div className={styles.textCenter}><h3>Base information</h3></div>
      <Collapsible open trigger="Job description" triggerTagName="h4" triggerStyle={{cursor: "pointer"}}>
        <p>
        - Own and deliver on the product roadmap, working closely with leadership to understand the product strategy and product vision <br/>
        - Work in close collaboration with the customer success team, marketing, and engineering to prioritize and develop the right product, and maximize value for customers <br/>
        - Directly work with customers to gather requirements and feedback and make adjustments to product roadmap based on customer inputs <br/>
        - Hire, coach, and grow the Vietnam product management team, creating an environment that helps them succeed, and improving the effectiveness of the product management function in the company <br/>
        - Contribute to the company strategy. Ensure that the plan is realistic and share it with the product people on your team <br/>
        - Represent the product management function on the leadership team, and build strong connections with the engineering, customer success, marketing, and sales teams <br/>
        </p>
      </Collapsible>
      <Collapsible open trigger="Job requirement" triggerTagName="h4" triggerStyle={{cursor: "pointer"}}>
        <p>
        - 10+ years of experience in technology and technology platforms <br/>
        - 5+ years of work experience as Senior Product Manager, Lead Product Manager, or Head of Product with at least 3 years working in a team management role <br/>
        - Proven track record partnering with other Business and Engineering stakeholders to communicate complex problems into clear and actionable strategies <br/>
        - Proven track record participating in developing and delivering high quality, especially SaaS products <br/>
        - The ability to lead independently in a fast paced environment <br/>
        - Excellent communication with engineering, sales, delivery, and marketing teams to ensure success <br/>
        - Solid understanding of the process of building software products from end-to-end <br/>
        - Experience with client-facing, on multiple projects at the same time <br/>
        - Strategic thinking represents prioritizing and quick thinking to move the product roadmap forward, remove roadblocks, and ensure an efficient workflow <br/>
        - Solid experience in working with agile / scrum methodologies <br/>
        - Experience in working design team and a passion for user experience <br/>
        - Fluent in written and verbal communication skills in English <br/>
        </p>
      </Collapsible>
      <div className={styles.textCenter}><h3>Competence Mapping</h3></div>
      <div style={{display: "flex", flexDirection: "column"}}>
        {Output.map(competence => (
         <div key={competence.Name} style={{
            display: "flex",
            flexDirection: "column",
            border: "1px solid black",
            marginBottom: "1rem",
            padding: "1rem",
          }}>
          <h3 className={styles.textCenter}>{`${competence.Name} (Expected level: ${competence.Level})`}</h3>
          <p>{competence.Description}</p>
          <h4>Why this competence is important?</h4>
          <p>{competence.Thought}</p>
          <h4>Knowledge Gap (Compare with current level - Intermediate)</h4>
          {competence["Knowledge Gap"].map((knowledge, p) => (
            <div style={{padding: "0.5rem"}}>
              <Collapsible open trigger={`Gap No ${p +1} - ${knowledge.Title}`} triggerTagName="h4" triggerStyle={{cursor: "pointer"}}>
                <div style={{display: "flex", flexDirection:"column", padding: "0.5rem"}}>
                  <p>{knowledge.Summary}</p>
                  <h5>Why this gap is important ?</h5>
                  <p>{knowledge.Thought}</p>
                  <h5>Self-reflect question ?</h5>
                  <ul>{knowledge["Key questions"].map(q => <li>{q}</li>)}</ul>
                  <Collapsible open trigger="Personalize learning course" triggerTagName="h5" triggerStyle={{cursor: "pointer"}}>
                    <h2>{knowledge.Course.Name}</h2>
                    <p>{knowledge.Course.Description}</p>
                    <h3>Learning objectives</h3>
                    <ul>
                      {knowledge.Course["Learning objectives"].map(obj => <li>{obj}</li>)}
                    </ul>
                    <h3>Modules</h3>
                    <div>
                      {knowledge.Course.Modules.map((obj, index) => <div style={{
                          display: "flex",
                          flexDirection: "column",
                          border: "1px solid black",
                          marginBottom: "1rem",
                          padding: "1rem",
                        }}>
                          <h5>Module {index +1} - {obj.Title}</h5>
                          <p>{obj.Description}</p>
                          <p><b>Core topics</b></p>
                          <ul>
                            {obj["Sub topics"].map(topic => <li>{topic}</li>)}
                          </ul>
                        </div>)}
                    </div>
                  </Collapsible>
                </div>
              </Collapsible>
            </div>            
          ))}
         </div> 
        ))}
      </div>
    </div>  
  </Layout>
)

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage
