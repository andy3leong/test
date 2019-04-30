import React from "react";
import { Link } from "react-router-dom";
import Client from "../components/api-client";

export default class Groups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      error: null
    };
  }

  componentWillMount() {
    this.loadData();
  }

  loadData = () => {
    Client.get("/groups")
      .then(resp => {
        this.setState({ groups: resp.data });
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };

  handleDelete = id => {
    Client.delete(`/groups/${id}`)
      .then(resp => {
        this.loadData();
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };

  render() {
    const { groups, error } = this.state;

    if (error) {
      console.log(error);
    }

    return (
      <div>
        <h1>Groups</h1>

        {error && (
          <div className="alert alert-danger" role="alert">
            Cannot process the request due to error.
          </div>
        )}

        <Link to="/groups/new">Add Group</Link>

        <table className="table table-hover">
          <thead>
            <tr>
              <th>Group Name</th>
              <th>Organizers</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {groups &&
              groups.map(g => (
                <tr key={`group-${g.id}`}>
                  <td>
                    <Link to={`/groups/${g.id}`}>{g.name}</Link>
                  </td>
                  <td>
                    <ul>
                      {g.meetups &&
                        g.meetups.map(mu => {
                          if (mu.role === "Organizer") {
                            return (
                              <li key={`meetup-${mu.id}`}>
                                {mu.user.first_name} {mu.user.last_name} (
                                {mu.role})
                              </li>
                            );
                          }
                          return false;
                        })}
                    </ul>
                  </td>
                  <td>
                    <Link to={`/groups/${g.id}/edit`}>
                      <button className="btn btn-primary">Edit</button>
                    </Link>{" "}
                    |{" "}
                    <button
                      className="btn btn-danger"
                      onClick={() => this.handleDelete(g.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}
