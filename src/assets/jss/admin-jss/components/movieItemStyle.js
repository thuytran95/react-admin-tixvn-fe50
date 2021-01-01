const movieItemStyle = (theme) => ({
  root: {
    maxWidth: 345,
    overflow: "hidden",
  },
  media: {
    height: 280,
  },
  typography: {
    color: theme.palette.subColor,
    padding: "5px 0 0 0",
  },
  deleteIcon: {
    color: theme.palette.red,
  },
  textAlign: {
    textAlign: "justify",
  },
  typography_h2: {
    lineHeight: "25px",
    display: "-webkit-box",
    webkitLineClamp: 2,
    overFlow: "hidden",
    textOverflow: "ellipsis",
    height: "50px",
    marginBottom: "10px",
  },

  cardActions: {
    display: "flex",
    justifyContent: "space-between",
  },
  description: {
    textAlign: "justify",
    padding: " 0 5px 0 0",
    lineHeight: "20px",
    display: "-webkit-box",
    webkitLineClamp: 2,
    overFlow: "hidden",
    textOverflow: "ellipsis",
    height: " 55px",
    marginBottom: "30px",
  },
});

export default movieItemStyle;
