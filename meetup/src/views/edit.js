import React from "react";
import { withRouter } from "react-router-dom";
import Client from "../components/api-client";

class EditGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      group: {},
      error: null
    };
  }

  componentWillMount() {
    Client.get(`/groups/${this.props.match.params.id}`)
      .then(resp => {
        this.setState({ group: resp.data });
      })
      .catch(err => {
        this.setState({ error: err });
      });
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { name, group } = this.state;
    if (name.length === 0) return;

    Client.patch(`/groups/${group.id}`, { group: { name } })
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
    const { group, error } = this.state;

    if (error) {
      console.log(error);
    }

    if (!group.id) return false;

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
            defaultValue={group.name}
          />
          <input type="submit" className="btn btn-primary" value="Update" />
        </form>
      </div>
    );
  }
}

export default withRouter(EditGroup);
