import React, { Component } from "react";
import { Link } from "react-router-dom";

class ExpenseEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expenses: [],
            listCategories: [],
            exp_name: "",
            amount: "",
            category_id: "",
            expense_date: ""
        };
        // bind
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeAmount = this.handleChangeAmount.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderExpenses = this.renderExpenses.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    // handle change
    handleChange(e) {
        this.setState({
            exp_name: e.target.value
        });
        // console.log(e.target.value);
    }
    // handle change Amount
    handleChangeAmount(e) {
        this.setState({
            amount: e.target.value
        });
        //console.log("onChange", this.state.amount);
    }

    // handle change Category
    handleChangeCategory(e) {
        this.setState({
            category_id: e.target.value
        });
        //console.log("onChange", this.state.category_id);
    }

    // handle change date
    handleChangeDate(e) {
        this.setState({
            expense_date: e.target.value
        });
        console.log("onChange", this.state.expense_date);
    }
    // handle submit
    handleSubmit(e) {
        e.preventDefault();
        axios
            .put(`/expenses/${this.props.match.params.id}`, {
                name: this.state.name
            })
            .then(response => {
                // console.log('from handle sumit', response);
                this.props.history.push("/");
            });
    }

    // get all the tasks from backend
    getTasks() {
        axios
            .get(`/expenses/${this.props.match.params.id}/edit`)
            .then(response =>
                this.setState({
                    expense: response.data.expense,
                    exp_name: response.data.expense.exp_name,
                    amount: response.data.expense.amount,
                    category_id: response.data.expense.category_id,
                    expense_date: response.data.expense.expense_date
                })
            );
    }
    // lifecycle mehtod
    componentDidMount() {
        this.getTasks();
    }

    render() {
        console.log(this.props.match.params.id);
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Edit Task</div>

                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <textarea
                                            onChange={this.handleChange}
                                            value={this.state.name}
                                            className="form-control"
                                            rows="5"
                                            maxLength="255"
                                            placeholder="Create a new task"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Edit Task
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ExpenseEdit;
