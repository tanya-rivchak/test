<template>
    <div class="bank-card" :class="{'edit-mode': bank.editable}">
        <h3 class="bank-card__name" 
            @input="handleBankNameInput" 
            :contenteditable="bank.editable">{{ name }}</h3>
        <div class="bank-row">
            <div class="bank-row__col" :data-attr="titles.rate">
                <input type="number" class="input"
                        :name="id+'-rate'" 
                        v-model="rate" 
                        v-if="bank.editable">
                <span v-else>{{ bank.rate }}</span>
                {{ units.rate }}
            </div>
            <div class="bank-row__col" :data-attr="titles.loan">
                <input type="number" class="input"
                        :name="id+'-loan'" 
                        v-model="loan" 
                        v-if="bank.editable">
                <span v-else>{{ bank.loan }}</span>
                {{ units.loan }}
            </div>
            <div class="bank-row__col" :data-attr="titles.payment">
                <input type="number" class="input"
                        :name="id+'-payment'" 
                        v-model="payment" 
                        v-if="bank.editable">
                <span v-else>{{ bank.payment }}</span>
                {{ units.payment }}
            </div>
            <div class="bank-row__col" :data-attr="titles.term">
                <input type="number" class="input"
                        :name="id+'-term'" 
                        v-model="term" 
                        min="0"
                        v-if="bank.editable">
                <span v-else>{{ bank.term }}</span>
                {{ units.term }}
            </div>
        </div>
        <div class="bank-card__btns">
            <button class="btn btn-primary" v-show="bank.editable"
                    @click="saveBank(id)"><span>save</span></button>
            <button class="btn btn-primary" v-show="bank.editable"  
                    @click="editClick(id)"><span>cancel</span></button>
            <button class="btn btn-primary" v-show="!bank.editable" 
                    @click="setEditMode(id)"><span>edit</span></button>
            <button class="btn btn-error"
                    @click="removeBank(id)"><span>remove</span></button>
        </div>
      </div>
</template>

<script>
export default {
    name: 'BanksCard',
    data() {
        return {
            name: this.bank.name,
            rate: this.bank.rate,
            loan: this.bank.loan,
            payment: this.bank.payment,
            term: this.bank.term
        } 
    },
    props: {
        id: {
            type: String,
            default: ""
        },
        bank: {
            type: Object,
            default: () => ({})
        },
        units: {
            type: Object,
            default: () => ({})
        },
        titles: {
            type: Object,
            default: () => ({})
        }
    },
    inject: ["setEditMode", "removeBank", "updateBank"],
    methods: {
        editClick(id){
            this.setInputValues();
            this.setEditMode(id);
        },
        saveBank(id){
            const newObj = {
                name: this.name,
                rate: this.rate,
                loan: this.loan,
                payment: this.payment,
                term: this.term,
                editable: false
            }

            // забула реалізувати валлідацію для збереження змін у данних банку
            this.updateBank({[id]: newObj});
        },
        setInputValues(){
            this.name = this.bank.name;
            this.rate = this.bank.rate;
            this.loan = this.bank.loan;
            this.payment = this.bank.payment;
            this.term = this.bank.term;
        },
        handleBankNameInput(e){
            this.name = e.target.innerText.trim();
        }
    }
}
</script>

<style lang="scss" scoped>

.bank-card{
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  width: 100%;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid var(--gray);
  &:not(.edit-mode){
    .bank-row{
      &:hover{
        box-shadow: 0px 3px 12px rgba(64, 76, 154, 0.05);
      }
    }
  }
  &.edit-mode{
    .bank-card__name{
        border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    }
    .bank-row{
      box-shadow: 0px 0px 0px rgba(64, 76, 154, 0.1);
    }
  }
  .bank-row{
    margin: 10px 0;
    padding: 10px 20px;
    border-radius: 10px;
    box-shadow: 0px 20px 75px rgba(64, 76, 154, 0.1);
    transition: box-shadow .3s ease-in;

    >*{
      display: flex;
      flex-flow: row nowrap;
      align-items: flex-end;
    }
    input{
      border: none;
      width: auto;
      border-bottom: 1px solid rgba(0,0,0,.15);
    }
    &>*:not(:last-child){
      border-right: 1px solid rgba(0,0,0,.15);
    }
  }
  &__name{
    margin-left: 30px;
    text-align: left;
    width: calc(100% - 60px);
  }
  &__btns{
    margin-left: auto;
    margin-right: 20px;

    >*{
      margin-right: 10px;
    }
  }
}
.bank-row__col{
    text-align: center;
    display: flex;
    justify-content: center;
    input{
        flex: 1;
    }
    >*{
        margin-right: 5px;
    }
}
</style>