const users = [{
    user: "Mali",
    password : "1234",
    balance: 200
},{
    user: "Gera",
    password : "4567",
    balance: 300
},{
    user: "Maui",
    password : "7890",
    balance: 400
},{
    user: "Sebas",
    password : "7777",
    balance: 990
},{
    user: "Vale",
    password : "2222",
    balance: 10
}
];

// ------- Login y contraseña ------- //

const user = document.querySelector("#user");
const password = document.querySelector("#password");
const form = document.querySelector("#form");
const btmBalance = document.querySelector("#btmBalance");
const btmAddMoney = document.querySelector("#btmAddMoney");
const btmWithdrawal = document.querySelector('#btmWithdrawal');
const menu = document.querySelector("#screenMenu");
const welcome = document.querySelector('#welcome');

let checkUser;
let checkPassword; 

form.addEventListener('submit', checkInformation);


function checkInformation(event){
    checkUser = user.value;
    checkPassword = password.value;
    if(users.some(user => user.user == checkUser && user.password == checkPassword)){
        console.log("Ingreso exitoso");
        pResult.innerText = "Ingreso exitoso";
        localStorage.setItem('user', checkUser);

    }else{
        event.preventDefault();
        console.log("user o contraseña incorrecta");
        pResult.innerText = "user o contraseña incorrecta";
    }
} 


// ------- Consultar Saldo ------- //


checkUser = localStorage.getItem('user');
welcome.innerText = "Bienvenid@ " + checkUser;

btmBalance.addEventListener('click', checkBalance);

function checkBalance(){
    deleteInformation();
    const pBalance = document.createElement('p');
    menu.appendChild(pBalance);
    const result = users.find(user => user.user == checkUser);
    pBalance.innerText = "Tu saldo es de: $" + result.balance;
}

// ------- Ingresar Saldo ------- //

btmAddMoney.addEventListener("click", addMoney);

function addMoney(){
    deleteInformation();
    const pInfo = document.createElement('p');
    const inputAdd = document.createElement('input');
    const btmAdd = document.createElement('button');
    const pResult = document.createElement('p')
    menu.appendChild(pInfo);
    menu.appendChild(inputAdd);
    menu.appendChild(btmAdd);
    menu.appendChild(pResult);
    pInfo.innerText = "¿Cuánto dinero vas a ingresar a la cuenta?";
    btmAdd.innerText = "Enviar";

    btmAdd.addEventListener('click',valAddMoney)
    function valAddMoney(){
        const result = users.find(user =>{
            if (user.user == checkUser){

                const x = user.balance + Number(inputAdd.value);
                console.log(x)
                if(x <= 990){
                    if (inputAdd.value > 0){
                        user.balance = x;
                        pResult.innerText = "Tu nuevo saldo es: $" + x
                    }
                    else{
                        pResult.innerText = "Error: Debes ingresar un valor mayor a $0"
                    }
                }
                else if (x > 990){
                    pResult.innerText = "Error: No puedes tener más dinero de $990 en tu cuenta.\nTu saldo sigue siendo: $" + user.balance +"\nIntenta ingresando un valor menor";
                }  
                else{
                    pResult.innerText = "Error: Solo debe ingresar números"
                }

            }
        })
    }

}

// ------- Retirar Saldo ------- //

btmWithdrawal.addEventListener('click',withdrawalMoney);

function withdrawalMoney(){
    deleteInformation();
    const pInfo = document.createElement('p');
    const input = document.createElement('input');
    const btm = document.createElement('button');
    const pResult = document.createElement('p');
    menu.appendChild(pInfo);
    menu.appendChild(input);
    menu.appendChild(btm);
    menu.appendChild(pResult);

    pInfo.innerText = "¿Cuánto dinero vas a retirar?";
    btm.innerText = "Enviar";

    btm.addEventListener('click', valwithdrawalMoney);

    function valwithdrawalMoney(){
        const result = users.find(user =>{
            if (user.user == checkUser){
                const x = user.balance - Number(input.value);
                console.log(x);
                if (x>=10){
                    if(Number(input.value)>0){
                        user.balance=x;
                        pResult.innerText = "Retiro exitoso.\nTu nuevo saldo es de: $" + x;
                    }
                    else{
                        pResult.innerText = "Error: Debes ingresar un valor mayor a $0"
                    }

                }
                else if(x >= 0 && x<10){
                    pResult.innerText = "Error: No puedes tener menos dinero de $10 en tu cuenta.\nTu saldo sigue siendo: $" + user.balance +"\nIntenta ingresando un valor menor";
                }
                else if(x < 0){
                    pResult.innerText = "Error: Saldo insuficiente\nTu saldo sigue siendo: $" + user.balance +"\nIntenta ingresando un valor menor";
                }
                else{
                    pResult.innerText = "Error: Solo debe ingresar números"
                }
            }
        }
        )
    }
}


function deleteInformation(){
    while (menu.firstChild) {
        menu.removeChild(menu.firstChild);
      }
};


