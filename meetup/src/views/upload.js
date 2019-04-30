import React from "react";
import Client from "../components/api-client";

export default class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      uploaded: false,
      error: null
    };
  }

  handleUpload = evt => {
    evt.preventDefault();
    const { file } = this.state;

    const formData = new FormData();
    formData.append("file", file);

    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    Client.post("upload", formData, config)
      .then(resp => {
        if (resp.status === 204) {
          this.setState({ uploaded: true, error: null });
        }
      })
      .catch(err => {
        this.setState({ error: err, uploaded: false });
      });

    console.log(this.state);
    return false;
  };

  onFileChange = evt => {
    this.setState({ file: evt.target.files[0] });
  };

  render() {
    const { uploaded, error } = this.state;
    return (
      <div>
        <h1>Upload CSV</h1>

        {!uploaded && error && (
          <div className="alert alert-danger" role="alert">
            File cannot be uploaded or processed due to error
          </div>
        )}
        {uploaded && !error && (
          <div className="alert alert-success" role="alert">
            File uploaded and processed.
          </div>
        )}

        <form onSubmit={this.handleUpload}>
          <input type="file" name="file" onChange={this.onFileChange} />
          <input type="submit" className="btn btn-primary" value="Upload" />
        </form>

      </div>
    );
  }
}
