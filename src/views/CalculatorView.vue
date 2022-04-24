<template>
  <div class="page">
    <h1 class="title">Mortgage calculator page</h1>
    <div class="calculator">
      <div class="calculator__body">
        <div class="calc-input selector">
          <input name="bank" placeholder="Bank" class="input" autocomplete="off"
                v-model="calculatorForm.bank" @input="bankSearch"/>
          <ul>
            <li v-for="(bank, id) in banksList" :key="id" v-show="banksVisibility[id]" @click="chooseBank(bank, id)">
              {{ bank.name }}
            </li>
            <li class="empty-list" v-if="bankExistence">Come on, just clear the field and try again or choose from the list :)</li>
          </ul>
        </div>
        <div class="calc-input">
          <input name="loan" placeholder="Initial loan" class="input" 
                v-model="calculatorForm.loan" type="number" />$
        </div>
        <div class="calc-input">
          <input name="payment" placeholder="Down payment" class="input" 
                v-model="calculatorForm.payment" type="number" />$
        </div>
      </div>
      <div class="calculator__result">
        {{ result }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "CalculatorView",
  data(){
    return{
      calculatorForm: {
        loan: '',
        payment: '',
        bank: ''
      },
      banksVisibility: {},
    }
  },
  mounted(){
    Object.keys(this.banksList).map(bank => this.banksVisibility[bank] = true)
  },
  computed: {
    bankExistence(){
      let isIt = Object.values(this.banksVisibility).filter(existance => existance == true);
      
      return isIt.length > 0 ? false : true
    },
    result(){
      const emptyFields = Object.values(this.calculatorForm).filter(val => String(val).trim().length == 0);

      if(emptyFields.length > 0){
        return "Fill in all fields and get the result"
      }
      
      let result = 0;
      let bankInput = String(this.calculatorForm.bank).trim().toLowerCase();
      let activeBank;

      if(bankInput.length > 0){
        activeBank = Object.keys(this.banksList).find(bank => bankInput == String(this.banksList[bank].name).trim().toLowerCase());
        if(!activeBank){
          return `It doesn't work that way - choose an existing bank`
        }
        activeBank = this.banksList[activeBank];

        if(+activeBank.loan < +this.calculatorForm.loan){
          return `The initial loan in ${activeBank.name} cannot be more than ${activeBank.loan}$`
        }

        if((+this.calculatorForm.payment * 100 / +this.calculatorForm.loan) < +activeBank.payment){
          return `Minimum down payment in ${activeBank.name} cannot be less than ${activeBank.payment}%, for your loan it will be: ${+activeBank.payment * +this.calculatorForm.loan / 100}$`
        }

        if(!activeBank){
          return "It doesn't work that way - choose an existing bank"
        }
      }

      // Результати розрахунків досить дивні, 
      // але я не змогла зрозуміти що не так 
      // 2 поле з початковим внеском взагалі ніде не використовується
      // більше схоже на щорічний внесок
      let r = activeBank.rate/12;
      let calcForResult = Math.pow((1 + r), activeBank.term);

      result = +this.calculatorForm.loan*r*calcForResult / calcForResult - 1
      result = result.toFixed(2)

      return `Monthly payment: ${result}$`
    },
    ...mapGetters("banks", ["banksList"]),
  },
  methods: {
    chooseBank(bank){
      this.calculatorForm.bank = bank.name
    },
    bankSearch(){
      Object.keys(this.banksList).map(bank => {
        let searchText = String(this.banksList[bank].name).toLowerCase();

        if(searchText.includes(String(this.calculatorForm.bank).trim().toLowerCase())){
          this.banksVisibility[bank] = true
        }else{
          this.banksVisibility[bank] = false
        } 
      })
      
    }
  },
}
</script>

<style lang="scss" scoped>
.calculator{
  &__body{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
  }
  &__result{
    text-align: center;
    font-size: 1.2em;
    margin-top: 40px;
  }
}
.selector{
  display: flex;
  flex-flow: column nowrap;
  input{
    &:focus, &:active{
      &~ul{
        box-shadow: 0 6px 12px rgba(0,0,0,.05);
        max-height: 200px;
        padding-top: 20px;
        padding-bottom: 20px;
      }
    }
  }
  ul{
    position: absolute;
    top: calc(100% + 5px);
    font-size: .9em;
    width: 100%;
    text-align: left;
    border-radius: 10px;
    overflow-y: auto;
    max-height: 0;
    padding: 0 20px;
    background: #fff;
    z-index: 9;
    transition: all .3s ease-in;
    li{
      list-style: none;
      margin-top: 10px;
      &:not(.empty-list){
        cursor: pointer;
      }
      &:first-child{
        margin-top: 0;
      }
    }
  }
}
.calc-input{
  width: 100%;
  position: relative;
  display: flex;
  .input{
    width: 100%;
  }
}
</style>