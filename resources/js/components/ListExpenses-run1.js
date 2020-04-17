import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import App from "./App";

export default class listExpenses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expenses: [],
            listCategories: [],
            isEdit: false,
            exp_name: "",
            amount: "",
            category_id: "",
            expense_date: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeAmount = this.handleChangeAmount.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.renderExpenses = this.renderExpenses.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    handleChange(e) {
        this.setState({
            exp_name: e.target.value
        });
        //console.log("onChange", this.state.exp_name);
    }

    handleChangeAmount(e) {
        this.setState({
            amount: e.target.value
        });
        console.log("onChange", this.state.amount);
    }

    handleChangeCategory(e) {
        this.setState({
            category_id: e.target.value
        });
        console.log("onChange", this.state.category_id);
    }

    handleChangeDate(e) {
        this.setState({
            expense_date: e.target.value
        });
        console.log("onChange", this.state.expense_date);
    }

    getExpenses() {
        axios.get("/expenses").then(response => {
            //console.log(response.data.expenses);
            console.log(response.data.listCategories);
            this.setState({
                expenses: [...response.data.expenses],
                listCategories: [...response.data.listCategories]
            });
        });
    }
    refreshTable() {
        this.componentDidMount();
    }
    // lifecycle method
    componentDidMount() {
        this.getExpenses();
    }

    // handle change date
    handleEdit(element) {
        this.setState({
            isEdit: true,
            id: element.id,
            exp_name: element.exp_name,
            amount: element.amount,
            category_id: element.category_id,
            expense_date: element.expense_date
        });
        //console.log("onChange", this.state.isEdit);
    }
    // handle change date
    handleUpdate(e) {
        e.preventDefault();
        //console.log("from handle state.id", this.state.id);
        //console.log("from handle name", this.state.expense_date);
        axios
            .put("/expenses/" + this.state.id, {
                //user_id: 1,
                exp_name: this.state.exp_name,
                amount: this.state.amount,
                category_id: this.state.category_id,
                expense_date: this.state.expense_date
            })
            .then(response => {
                console.log("from handle reponse update", response);
                //console.log("from handle reponse update", this.state.exp_name);
                this.setState({
                    //expenses: [response, ...this.state.expenses],
                    isEdit: false
                }).catch(err => {
                    console.log("test error", err);
                });
            });
        //this.setState({
        // then clear values

        //});
        //console.log("onChange", this.state.isEdit);
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

    renderEditExpenses() {
        const { id, exp_name, amount, category_id, expense_date } = this.state;
        return (
            <div className="input-group ">
                <input value={id} type="hidden" />
                Title:
                <input
                    onChange={this.handleChange}
                    value={exp_name}
                    type="text"
                    className="form-control"
                    placeholder="Expense title"
                />
                Amount:
                <input
                    onChange={this.handleChangeAmount}
                    //contentEditable="true"
                    value={amount}
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
                    value={expense_date}
                    className="expense_date"
                ></input>
                <button onClick={this.handleUpdate} className="btn btn-warning">
                    Update Expense
                </button>
            </div>
        );
    }

    renderExpenses() {
        return (
            <div>
                <App addHandle={this.refreshTable.bind(this)} />
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
                <div>
                    {this.state.isEdit ? (
                        <div>{this.renderEditExpenses()}</div>
                    ) : null}
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                <div>{this.renderExpenses()}</div>
            </div>
        );
    }
}
