import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

export default class App extends Component {
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
        this.handleEdit = this.handleEdit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderExpenses = this.renderExpenses.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    // handle change Expense Name
    handleChange(e) {
        this.setState({
            exp_name: e.target.value
        });
        //console.log("onChange", this.state.exp_name);
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
        //console.log("onChange", this.state.expense_date);
    }

    handleSubmit(e) {
        // stop browser's default behaviour of reloading on form submit
        e.preventDefault();
        axios
            .post("/expenses", {
                exp_name: this.state.exp_name,
                amount: this.state.amount,
                category_id: this.state.category_id,
                expense_date: this.state.expense_date
            })
            .then(response => {
                console.log("from handle submit", response);
                this.setState({
                    expenses: [response.data, ...this.state.expenses],
                    // then clear values
                    exp_name: "",
                    amount: "",
                    category_id: "",
                    expense_date: ""
                });
            });
    }

    // console.log(response.data.expenses)
    // get expenses from route:web
    getExpenses() {
        axios.get("/expenses").then(response => {
            console.log(response.data.expenses);
            console.log(response.data.listCategories);
            this.setState({
                expenses: [...response.data.expenses],
                listCategories: [...response.data.listCategories]
            });
        });
    }

    // lifecycle method
    componentDidMount() {
        this.getExpenses();
    }
    // handle change date
    handleEdit(element) {
        this.setState({
            isShow: true,
            exp_name: element.exp_name,
            amount: element.amount,
            category_id: element.category_id,
            expense_date: element.expense_date
        });
        //console.log("onChange", this.state.exp_name);
        // console.log("onChange", this.state.amount);
        // console.log("onChange", this.state.category_id);
        // console.log("onChange", this.state.expense_date);
    }

    handleDelete(id) {
        // remove from local state
        const isNotId = expense => expense.id !== id;
        const updatedExpenses = this.state.expenses.filter(isNotId);
        this.setState({ expenses: updatedExpenses });
        //console.log(id);

        // make delete request to the backend
        axios.delete("/expenses/" + id);
    }

    // render tasks
    renderExpenses() {
        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th>Title:</th>
                            <th>Amount:</th>
                            <th>Category Name: </th>
                            <th>Date: </th>
                            <th>Edit:</th>
                            <th>Delete:</th>
                        </tr>
                        {this.state.expenses.map(expenses => (
                            <tr key={expenses.id}>
                                <td>{expenses.exp_name} </td>
                                <td>{expenses.amount} </td>
                                <td>{expenses.category_id} </td>
                                <td>{expenses.expense_date} </td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-success"
                                        onClick={() =>
                                            this.handleEdit(expenses)
                                        }
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() =>
                                            this.handleDelete(expenses.id)
                                        }
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

    renderForm() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    Title:
                    <input
                        onChange={this.handleChange}
                        value={this.state.exp_name}
                        type="text"
                        className="form-control"
                        placeholder="Expense title"
                    />
                    Amount:
                    <input
                        onChange={this.handleChangeAmount}
                        value={this.state.amount}
                        type="text"
                        className="form-control"
                        placeholder="Amount"
                    />
                    Category:
                    <select onChange={this.handleChangeCategory}>
                        <option>Select Category</option>
                        {this.state.listCategories.map(listCategories => (
                            <option
                                key={listCategories.id}
                                value={listCategories.id}
                            >
                                {listCategories.cat_name}
                            </option>
                        ))}
                    </select>
                    Date:
                    <input
                        type="date"
                        onChange={this.handleChangeDate}
                        value={this.state.expense_date}
                        className="expense_date"
                    ></input>
                </div>
                <button type="submit" className="btn btn-primary">
                    Add Expense
                </button>
            </form>
        );
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Add Expense</div>
                            <div className="card-body">
                                {this.renderForm()}
                                <hr />
                                {this.renderExpenses()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
