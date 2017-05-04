/**
 * Created by huk on 17/3/17.
 */
function coffee() {
    console.log('coffee');
}
function sweetCoffee() {
    coffee();
    console.log('sugar');
}
function saltCoffee() {
    sweetCoffee();
    console.log('salt');
}
saltCoffee();