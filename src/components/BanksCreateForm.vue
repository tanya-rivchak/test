<template>
    <form class="bank-form">
      <div class="bank-form__body">
        <div class="bank-input">
            <div class="bank-input__wrapper">
                <input type="text" name="name" :placeholder="fieldSet.name.placeholder" 
                        v-model="bankFormData.name" class="input" 
                        :class="{'input_error': bankFormDataErrors.name}" 
                        required>
            </div>
        </div>
        <div class="bank-input">
            <div class="bank-input__wrapper">
                <input type="number" name="rate" 
                        :placeholder="fieldSet.rate.placeholder" 
                        v-model="bankFormData.rate" class="input" 
                        :class="{'input_error': bankFormDataErrors.rate}" 
                        required>{{fieldSet.rate.unit}}
            </div>
        </div>
        <div class="bank-input">
            <div class="bank-input__wrapper">
                <input type="number" name="loan"
                        :placeholder="fieldSet.loan.placeholder" 
                        v-model="bankFormData.loan" class="input"  
                        :class="{'input_error': bankFormDataErrors.loan}" 
                        required>{{fieldSet.loan.unit}}
            </div>
        </div>
        <div class="bank-input">
            <div class="bank-input__wrapper">
                <input type="number" name="payment"
                        :placeholder="fieldSet.payment.placeholder" 
                        v-model="bankFormData.payment" class="input"  
                        :class="{'input_error': bankFormDataErrors.payment}" 
                        required>{{fieldSet.payment.unit}}
            </div>
        </div>
        <div class="bank-input">
            <div class="bank-input__wrapper">
                <input type="number" name="term"
                        :placeholder="fieldSet.term.placeholder" 
                        v-model="bankFormData.term" class="input"  
                        :class="{'input_error': bankFormDataErrors.term}" 
                        required>{{fieldSet.term.unit}}
            </div>
        </div>
      </div>
      <button class="btn btn-primary" type="button" @click="submitForm"><span>add new bank</span></button>
      <div class="error" v-if="hasError">{{ error }}</div>
    </form>
</template>

<script>
export default {
    name: "BanksCreateForm",
    data(){
        return{
            bankFormData: {
                name: '',
                rate: '',
                loan: '',
                payment: '',
                term: ''    
            },
            bankFormDataErrors: {
                name: false,
                rate: false,
                loan: false,
                payment: false,
                term: false  
            },
            response: '',
            error: false,
        }
    },
    props: {
        fieldSet: {
            type: Object,
            default: () => ({})
        }
    },
    methods: {
        async submitForm(){
            this.removeInputErrors();

            const emptyFields = Object.values(this.bankFormData).filter(val => String(val).trim().length == 0);

            if(emptyFields.length > 0){
                Object.keys(this.bankFormData).forEach(field => {
                    if(String(this.bankFormData[field]).trim().length == 0){
                        this.bankFormDataErrors[field] = true
                    }
                })
                this.error = "We still have empty fields..."
                return
            }

            const negativeNumbers = Object.values(this.bankFormData).filter(val => (typeof val == 'number' && val < 0));

            if(negativeNumbers.length > 0){
                Object.keys(this.bankFormData).forEach(field => {
                    if(typeof this.bankFormData[field] == 'number' && this.bankFormData[field] < 0){
                        this.bankFormDataErrors[field] = true
                    }
                })

                this.error = "Okay, I'll be honest, you can't use negative numbers..."
                return
            }

            Object.keys(this.bankFormData).forEach(field => {
                if(field == 'rate' || field == 'payment'){
                    if(this.bankFormData[field] > 100){
                        this.bankFormDataErrors[field] = true
                    }
                }
            })

            const wrongPercentages = Object.values(this.bankFormDataErrors).filter(val => val === true)

            if(wrongPercentages.length > 0){
                this.error = "Percentage fields must not exceed 100. Although 100 doesn't make much sense either..."
                return
            }

            this.error = false;
            this.$emit('addNewBank', this.bankFormData);
            this.clearForm();
        },
        removeInputErrors(){
            Object.keys(this.bankFormDataErrors).forEach(field => {
                this.bankFormDataErrors[field] = false
            })
        },
        clearForm(){
            this.bankFormData= {
                name: '',
                rate: '',
                loan: '',
                payment: '',
                term: ''    
            }
        }
    },
    computed:{
        hasError(){
            return this.error === false ? false : true
        }
    }
}
</script>

<style lang="scss" scoped>
.bank-form{
  display: flex;
  flex-flow: row wrap;
  align-items: flex-end;
  margin-bottom: 40px;
}
.bank-form__body{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  margin-right: 20px;
}
.bank-input{
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-end;
  justify-content: flex-start;
  white-space: nowrap;
  &__wrapper{
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
  }

  label{
    width: 100%;
    text-align: left;
  }

  input{
    margin-right: 5px;
    width: 100%;
    max-width: 200px;
  }
}

.bank-form__body{
    
  >*:first-child{
      grid-column-start: 1;
      grid-column-end: 3;
      input{
          max-width: unset;
      }
  }
}
</style>