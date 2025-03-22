import React, { Component } from "react";

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.book ? props.book.title : "",
            description: props.book ? props.book.description : "",
            available: props.book ? props.book.available : true,
            rentee: props.book ? props.book.rentee : "",
            error: "",
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.book !== this.props.book) {
            this.setState({
                title: this.props.book ? this.props.book.title : "",
                description: this.props.book ? this.props.book.description : "",
                available: this.props.book ? this.props.book.available : true,
                rentee: this.props.book ? this.props.book.rentee : "",
                error: "",
            });
        }
    }
    

    handleSubmit = (e) => {
        e.preventDefault();

        const { title, description, available, rentee } = this.state;

        // Basic validation to check if required fields are filled
        if (!title || !description || !rentee) {
            this.setState({ error: "Title, Description & Rentee are required" });
            return;  // Prevent form submission if validation fails
        }

        const bookData = { title, description, available, rentee };
        this.props.onSave(bookData);  // Passing the book data to the parent component
    };

    render() {
        return (
            <div className="modal show" style={{ display: "block" }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                {this.props.book ? "Edit Book" : "Add New Book"}
                            </h5>
                            <button
                                className="close"
                                onClick={this.props.onClose}
                            >
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label>Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={this.state.title}
                                        onChange={(e) => this.setState({ title: e.target.value })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Description</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={this.state.description}
                                        onChange={(e) => this.setState({ description: e.target.value })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Rentee</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={this.state.rentee}
                                        onChange={(e) => this.setState({ rentee: e.target.value })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Available</label>
                                    <input
                                        type="checkbox"
                                        checked={this.state.available}
                                        onChange={(e) => this.setState({ available: e.target.checked })}
                                    />
                                </div>

                                {this.state.error && (
                                    <div className="alert alert-danger">
                                        {this.state.error}
                                    </div>
                                )}

                                <button type="submit" className="btn btn-primary">
                                    {this.props.book ? "Save Changes" : "Create Book"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;
