<template>
  <div class="page">
    <h1 class="title">Banks List</h1>
    <BanksCreateForm :fieldSet="fieldSet" @addNewBank="addNewBank" />
    <BanksList :banksList="banksList" 
                :units="units" 
                :titles="titles"
                @removeEditMode="removeEditMode" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BanksCreateForm from '@/components/BanksCreateForm'
import BanksList from '@/components/BanksList'

export default {
  name: 'HomeView',
  components: {
    BanksCreateForm,
    BanksList
  },
  provide(){
    return {
      updateBankInputVal: this.updateBankInputVal,
      setEditMode: this.setEditMode,
      removeBank: this.removeBank,
      updateBank: this.updateBank
    }
  },
  computed:{
    ...mapGetters("banks", ["fieldSet",
                            "banksList", 
                            "units", 
                            "titles"]),
  },
  methods: {
    ...mapActions("banks", ["updateBankInputVal", 
                            "setEditMode",
                            "removeEditMode",
                            "removeBank",
                            "updateBank",
                            "addNewBank"]),
  },
}
</script>

<style lang="scss" scoped>

</style>