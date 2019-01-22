module.exports = {
  siteMetadata: {
    title: `Nishiki Liu`,
    description: `Personal blog of a software engineer.`,
    siteUrl: `https://nshki.com`,
    twitterUrl: `https://mobile.twitter.com/nshki_`,
    githubUrl: `https://github.com/nshki`,
    linkedinUrl: `https://www.linkedin.com/in/nshki/`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-feed`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-smartypants`,
          `gatsby-remark-prismjs`,
          `gatsby-remark-reading-time`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 700,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts`
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-28039939-12`,
      },
    },
  ],
};
