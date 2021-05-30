import React from "react";

class ProfileStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = { status: this.props.status, editMode: false };
  }

  activateEditMode = () => {
    this.setState({ editMode: true });
  };

  deactivateEditMode = () => {
    this.props.uploadStatus(this.state.status);
    this.setState({ editMode: false });
  };

  onKeyDown = (e) => {
    if (e.key === "Enter") this.deactivateEditMode();
  };

  onChange = (e) => {
    this.setState({ status: e.target.value });
  };

  render() {
    return (
      <div>
        {this.state.editMode ? (
          <div>
            <input
              autoFocus={true}
              onChange={this.onChange}
              onBlur={this.deactivateEditMode}
              onKeyDown={this.onKeyDown}
              value={this.state.status}
            />
          </div>
        ) : (
          <div>
            <span onDoubleClick={this.activateEditMode}>
              {this.props.status || "set status"}
            </span>
          </div>
        )}
      </div>
    );
  }
}

export default ProfileStatus;
