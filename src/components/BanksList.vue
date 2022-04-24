<template>
    <div class="bank-list">
        <div class="bank-row bank-list__head">
            <div v-for="(title, name) in titles" :key='name'>{{title}}</div>
        </div>
        <BanksCard v-for="(bank, id) in banksList" 
                    :key="id"
                    :bank="bank"
                    :id="id"
                    :units="units"
                    :titles="titles" />
    </div>  
</template>

<script>
import BanksCard from '@/components/BanksCard.vue';

export default {
    name: "BanksList",
    components: {
        BanksCard
    },
    props: {
        banksList: {
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
    unmounted(){
        this.$emit('removeEditMode')
    }
}
</script>

<style lang="scss">
.bank-list{
  display: flex;
  flex-flow: column-reverse nowrap;
}
.bank-row{
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  &>*{
    padding: 5px 10px;
  }
}
.bank-list__head{
  color: var(--smoky);
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(0,0,0,.15);
  padding: 0px 20px 10px;
  order: 1;
}
</style>