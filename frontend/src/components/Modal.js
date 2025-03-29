import React, { Component } from "react";

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.book ? props.book.title : "",
            author: props.book ? props.book.author : "",
            genre: props.book ? props.book.genre : "",
            description: props.book ? props.book.description : "",
            available: props.book ? props.book.available : true,
            rentee: props.book ? props.book.rentee : "",
            error: "",
        };
    }

    componentDidUpdate(prevProps) {
        // Update local state when book prop changes
        if (prevProps.book !== this.props.book) {
            this.setState({
                title: this.props.book ? this.props.book.title : "",
                author: this.props.book ? this.props.book.author : "",
                genre: this.props.book ? this.props.book.genre : "",
                description: this.props.book ? this.props.book.description : "",
                available: this.props.book ? this.props.book.available : true,
                rentee: this.props.book ? this.props.book.rentee : "",
                error: "",
            });
        }
        
        // Update local error state if props.error changes
        if (prevProps.error !== this.props.error && this.props.error) {
            this.setState({ error: this.props.error });
        }
    }
    
    handleSubmit = (e) => {
        e.preventDefault();

        const { title, description, available, rentee, author, genre } = this.state;

        // Basic validation to check if required fields are filled
        if (!title || !description || !author || !genre) {
            this.setState({ error: "Title, Description, Author & Genre are required" });
            return;  // Prevent form submission if validation fails
        }

        const bookData = { title, description, available, rentee, author, genre };
        this.props.onSave(bookData);  // Passing the book data to the parent component
    };

    render() {
        // Use either local error state or error passed from props
        const errorMessage = this.state.error || this.props.error;
        
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
                            {errorMessage && (
                                <div className="alert alert-danger">
                                    {errorMessage}
                                </div>
                            )}
                            
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
                                    <label>Author</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={this.state.author}
                                        onChange={(e) => this.setState({ author: e.target.value })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Genre</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={this.state.genre}
                                        onChange={(e) => this.setState({ genre: e.target.value })}
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