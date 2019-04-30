import React from "react";
import { Link } from "react-router-dom";
import Client from "../components/api-client";

export default class ShowGroup extends React.Component {
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

  render() {
    const { group, error } = this.state;

    if (error) {
      console.log(error);
    }

    return (
      <div>
        <Link to={`/groups/${group.id}/edit`}>Edit</Link>
        <h1>Group - {group.name}</h1>

        { error && <div className="alert alert-danger" role="alert">
          Cannot process the request due to error.
        </div>}

        <h3>Users</h3>
        <ul>
          {group && group.meetups &&
            group.meetups.map(mu => (
              <li
                key={`meetup-${mu.id}`}
                className={mu.role === "Organizer" ? "text-bold" : ""}
              >
                {mu.user.first_name} {mu.user.last_name} ({mu.role})
              </li>
            ))}
        </ul>
      </div>
    );
  }
}
