import React from "react";
import { withRouter } from "react-router-dom";
import Client from "../components/api-client";

class NewGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      error: null
    };
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { name } = this.state;
    if (name.length === 0) return;

    Client.post(`/groups`, { group: { name } })
      .then(resp => {
        this.setState({ group: resp.data });
        this.props.history.push('/groups');
      })
      .catch(err => {
        this.setState({ error: err });
      });
  }

  onNameChange = evt => {
    this.setState({ name: evt.target.value });
  };

  render() {
    const { error } = this.state;

    if (error) {
      console.log(error);
    }

    return (
      <div>
        <h1>Group</h1>
        {error && (
          <div className="alert alert-danger" role="alert">
            Cannot process the request due to error.
          </div>
        )}
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            onChange={this.onNameChange}
            placeholder="Name"
          />
          <input type="submit" className="btn btn-primary" value="Add" />
        </form>
      </div>
    );
  }
}

export default withRouter(NewGroup);
