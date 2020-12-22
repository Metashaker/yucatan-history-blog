/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Link, StaticQuery, graphql } from "gatsby"
import { RiArrowDownLine, RiArrowRightSLine } from "react-icons/ri"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PostCard from "../components/video-post-card"

const PostMaker = ({ data }) => (
  <Layout>
  <section className="home-posts">
    <h2>Últimos <strong>videos</strong> <span class="icon -right"><RiArrowDownLine/></span></h2>
    <div className="grids col-1 sm-2 lg-3">
      {data}
    </div>
    {/*<Link 
      className="button" 
      to="/blog"
      sx={{
        variant: 'links.button'
      }}
    >
      See more<span class="icon -right"><RiArrowRightSLine/></span>
    </Link>*/}
  </section>
  </Layout>
)

export default function VideosList() {
  return (
    <StaticQuery 
      query={graphql`
        query {
          allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { frontmatter: { template: { eq: "videos-list" } } }
            limit: 6
          ) {
            edges {
              node {
                id
                excerpt(pruneLength: 250)
                frontmatter {
                  date(formatString: "MMMM DD, YYYY")
                  slug
                  title
                  featuredImage {
                    childImageSharp {
                      fluid(maxWidth: 540, maxHeight: 360, quality: 80) {
                        ...GatsbyImageSharpFluid
                        ...GatsbyImageSharpFluidLimitPresentationSize
                      }
                    }
                  }
                }
              }
            }
          }
        }`
      }

      render={ data => {
        console.log(data)
          const posts = data.allMarkdownRemark.edges
            //.filter(edge => !!edge.node.frontmatter.date)
            .map(edge =>
              <PostCard key={edge.node.id} data={edge.node} />
          ).reverse()
          return <PostMaker data={posts} />
        } 
      }
    />
  )
}