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
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    // handle change Expense Name
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
        //console.log("onChange", this.state.amount);
    }

    handleChangeCategory(e) {
        this.setState({
            category_id: e.target.value
        });
        //console.log("onChange", this.state.category_id);
    }

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
                //console.log("from handle submit", response);
                this.setState({
                    expenses: [response.data, ...this.state.expenses]
                });
            })
            .then(data => {
                this.props.addHandle();
            });
        this.setState({
            // then clear values
            exp_name: "",
            amount: "",
            category_id: "",
            expense_date: ""
        });
    }
    // console.log(response.data.expenses)
    // get expenses from route:web
    getExpenses() {
        axios.get("/expenses").then(response => {
            //console.log(response.data.expenses);
            //console.log(response.data.listCategories);
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
            <div>
                {this.renderForm()}
                <hr />
            </div>
        );
    }
}
//{this.renderExpenses()}
