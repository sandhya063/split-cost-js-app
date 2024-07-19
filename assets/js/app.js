function User(name, email, mobile, photo) {
    this.name = name;
    this.email= email;
    this.mobile = mobile;
    this.photo = photo;
}

function Expense(description, amount) {
    this.description = description;
    this.amount = amount;
    this.isSettled = false;
    this.date = new Date();
}
function SplitCostApp() {
    this.unsettledAmount = 0;
    this.users = [];
    this.expenses = [];

    this.displayUnsettledAmount = function() {
        document.querySelector(".amount").textContent = `$${this.unsettledAmount}`;
    }
    this.addUser = function(name,email,mobile,photo) {
        const user = new User(name,email,mobile,photo);
        this.users.push(user);
        this.displayUsers();
    }
    this.displayUsers = function(){
        let userElements = '';
        for(let user of this.users) {
            userElements += `<div><img src="${user.photo}" alt="${user.name}" /></div>`
        }
        document.querySelector(".user-wrapper").innerHTML = userElements;
    }
    this.displayExpenses = function() {
        let expenseElement = '';
        for(let expense of this.expenses) {
            expenseElement += `
            <div class="expenses-item">
            <div>
                <span>${expense.description}</span>
                <span>${expense.amount}</span>
            </div>
            <div class="date">${expense.date}</div>
            </div>
            `
        }
        document.querySelector('.expenses-wrapper').innerHTML = expenseElement;
        

    }
    this.addExpenses = function(event) {
        event.preventDefault();
        console.log('Adding expenses...');
        const description = document.querySelector("#description").value;
        const amount = document.querySelector("#amount").value;
        if (description && amount ) {
        const expense = new Expense(description , amount);
        this.expenses.unshift(expense);
        console.log(this.expenses);
        this.displayExpenses();
        document.querySelector("form").reset();
        this.calculateUnsettledAmount();
        this.displayUnsettledAmount();

        }

    }
    this.calculateUnsettledAmount = function() {
        let total = 0;
        for(let expense of this.expenses) {
            total  = total + Number(expense.amount);
        }
        const unsettledAmount = total / this.users.length;
        this.unsettledAmount = unsettledAmount;
    }
    this.addEventListener = function() {
        document.querySelector("form").addEventListener('submit' , (event) => {
            this.addExpenses(event);
        });
    }
    this.addSettleNowEventListener = function() {
        document.querySelector("#settleNowBtn").addEventListener("click", (event)=> {
            this.settleNow(event);
        })
    }
    this.settleNow = function(event) {
        console.log('Settling now!');
        this.expenses = this.expenses.map(expense => {
            return {...expense, isSettled: true}
        });

        this.displayExpenses();
        this.calculateUnsettledAmount();
        this.displayUnsettledAmount();


    }
    this.addNewUserEventListener = function() {
        document.getElementById("addNewUser").addEventListener('click' , () => {
            const randomValue = parseInt(Math.random() * 100);
            this.addUser('Sandhya', 'sandhyaaryal777@gmail.com' , '0410379153' , `https://randomuser.me/api/portraits/men/${randomValue}.jpg`);
            this.calculateUnsettledAmount();
            this.displayUnsettledAmount();


        })
    }

}

const splitCostApp = new SplitCostApp();
splitCostApp.addSettleNowEventListener();
splitCostApp.displayUnsettledAmount();
splitCostApp.addEventListener();
splitCostApp.addUser('Sandhya', 'sandhyaaryal777@gmail.com' , '0410379153' , 'https://randomuser.me/api/portraits/lego/1.jpg');
splitCostApp.addUser('Sandhya', 'sandhyaaryal777@gmail.com' , '0410379153' , 'https://randomuser.me/api/portraits/lego/5.jpg');
splitCostApp.addUser('Sandhya', 'sandhyaaryal777@gmail.com' , '0410379153' , 'https://randomuser.me/api/portraits/lego/2.jpg');
splitCostApp.displayUsers();
splitCostApp.addNewUserEventListener();





