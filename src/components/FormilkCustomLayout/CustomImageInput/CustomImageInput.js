import React, { Component } from "react";
import { Avatar, Typography } from "@material-ui/core";
import { Error, Folder } from "@material-ui/icons";
import Icon from "@material-ui/core/Icon";
import withStyles from "@material-ui/core/styles/withStyles";
import customImageInputStyle from "./CustomImageInputStyle";
import classnames from "classnames";

class CustomImageInput extends Component {
  constructor(props) {
    super(props);
    this.fileUpload = React.createRef();
    this.showFileUpload = this.showFileUpload.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  state = {
    file: undefined,
    imagePreviewUrl: undefined,
  };

  showFileUpload() {
    if (this.fileUpload) {
      this.fileUpload.current.click();
    }
  }

  handleImageChange(event) {
    event.preventDefault();

    let reader = new FileReader();
    let file = event.target.files[0];
    if (file) {
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result,
        });
      };
      reader.readAsDataURL(file);

      this.props.setFieldValue(this.props.field.name, file);
      console.log(file);
    }
  }

  showPreloadImage() {
    const { errorMessage, classes } = this.props;
    const { file, imagePreviewUrl } = this.state;

    let comp = null;
    if (errorMessage) {
      comp = <Error style={{ fontSize: 36 }} />;
    } else if (file) {
      console.log(imagePreviewUrl);
      comp = (
        <img className={classes.avatarThumb} src={imagePreviewUrl} alt="Phim" />
      );
    } else {
      comp = <Folder style={{ fontSize: 36 }} />;
    }
    return comp;
  }

  componentDidMount() {
    console.log(this.fileUpload.current);
  }

  render() {
    const { errorMessage, title, classes, image } = this.props;
    const { name, onBlur } = this.props.field;
    const avatarStyle = classnames(
      classes.bigAvatar,
      this.state.file ? [classes.whiteBack] : [classes.primaryBack],
      { [classes.errorBack]: errorMessage }
    );
    console.log(image);

    return (
      <div className={classes.container}>
        <input
          className={classes.hidden}
          id={name}
          name={name}
          type="file"
          onChange={this.handleImageChange}
          ref={this.fileUpload}
        />
        <Typography className={classes.title} variant="h5">
          {title}
        </Typography>
        <Avatar className={avatarStyle} onClick={this.showFileUpload}>
          {this.showPreloadImage()}
        </Avatar>

        {errorMessage ? (
          <Typography variant="caption" color="error">
            {errorMessage}
          </Typography>
        ) : null}
      </div>
    );
  }
}

export default withStyles(customImageInputStyle)(CustomImageInput);
