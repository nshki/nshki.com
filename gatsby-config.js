module.exports = {
  siteMetadata: {
    title: `Nishiki Liu`,
    description: `Personal blog of a software engineer.`,
    url: `https://nshki.com`,
    twitterUrl: `https://mobile.twitter.com/nshki_`,
    githubUrl: `https://github.com/nshki`,
    linkedinUrl: `https://www.linkedin.com/in/nshki/`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
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
  ],
};
