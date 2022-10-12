<template>
  <div class="relative bg-[#E5E5E5] rounded-md pl-20 pr-20 py-8  container mx-auto p-6">
    <div class="flex items-center  justify-between">
      <div class="flex items-center">
        <p class="text-lg font-normal font-roboto">Search by release date:</p>
        <date-range-picker singleDatePicker="range" class="!min-w-[220px] ml-8 rounded-md " ref="picker" v-model="dateRange" />
      </div>
      <button class="text-white bg-[#549DF2] py-2 px-4 rounded-3xl">Search</button>
    </div>
  </div>
</template>

<script>
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'

export default {
  components: { DateRangePicker },
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      opens: '',
      singleDatePicker: '',
      timePicker: '',
      showWeekNumbers: '',
      showDropdowns: '',
      autoApply: false,
      dateRange: {},
      updateValues: '',
      maxDate: '',
      minDate: '',
      linkedCalendars: false,
      timePicker24Hour: false,

    }
  },
  methods: {


    dateFormat() { }
  }
}
</script>
