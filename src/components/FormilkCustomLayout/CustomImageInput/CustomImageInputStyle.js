const customImageInputStyle = (theme) => ({
  hidden: {
    display: "none",
  },
  container: {
    margin: "auto",
  },
  title: {
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    //fontFamily: 'Roboto Slab',
    //fontWeight:'bold',
    padding: theme.spacing(1),
  },
  bigAvatar: {
    margin: "auto",
    width: 80,
    height: 80,
    borderColor: theme.palette.primary.main,
    borderStyle: "solid",
    borderSize: "1px",
  },
  avatarThumb: {
    maxWidth: 80,
    maxHeight: 80,
  },
  primaryBack: {
    background: theme.palette.primary.main,
  },
  whiteBack: {
    background: "white",
  },

  errorBack: { background: theme.palette.error.main },
});

export default customImageInputStyle;
