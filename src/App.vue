<template>
  <div id="app">
    <div>
      <input type="text" v-model="searchInput" placeholder="Введите слова или часть"> <a href="javaScript:void(0)"
                                                                                         @click="searchInput = null">Сбросить</a>
    </div>
    <div class="checkbox-btn">
      <input type="checkbox" v-model="registerIs"/>
      <span @click="registerIs = !registerIs">Aa</span>
    </div>
    <div>Сортировка:</div>
    <div class="radio-btn">
      <input type="radio" value="none" v-model="sortingVue">
      <label @click="sortingVue = 'none'">Без сортировки</label>
      <input type="radio" value="descending" v-model="sortingVue">
      <label @click="sortingVue = 'descending'">По убыванию</label>
      <input type="radio" value="ascending" v-model="sortingVue">
      <label @click="sortingVue = 'ascending'">По возрастанию</label>
    </div>

    <div>
      <span>Поиск с учетом регистра {{ register ? 'включен': 'выключен' }}</span>
    </div>

    <div>Результат ({{ getCount }}):</div>
    <div class="result">
      <template v-if="getListArray.length === 0">
        <span class="error-alert">Нет данных для отображения</span>
      </template>
      <template v-else>
        <template v-if="getCount > countList">
          <a href="javaScript:void(0)" @click="visible = !visible">
            <span v-if="!visible">
              Показать
            </span>
            <span v-else>
              Скрыть
            </span>
          </a>
        </template>
        <ul>
          <li v-for="(item,index) in getListArrayCount" :key="item.id">
            {{ item.title }} (main: {{ item.main.toString() }})
          </li>
          <li v-if="getCount > countList && !visible">
            ...
          </li>
        </ul>

      </template>
    </div>
  </div>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'

  export default {
    name: 'app',
    data: () => ({
      searchInput: null,
      registerIs: false,
      sortingVue: null,
      visible: false,
      countList: 0
    }),
    watch: {
      searchInput() {
        this.$store.dispatch("updateSearch", this.searchInput)
      },
      registerIs() {
        this.$store.dispatch("updateRegister", this.registerIs)
      },
      sortingVue() {
        this.$store.dispatch("updateSorting", this.sortingVue)
      },
      visible() {
        this.$store.dispatch("updateVisible", this.visible)
      }
    },
    computed: {
      ...mapState(
        [
          'main',
          'search',
          'register',
          'sorting',
          'count'
        ]
      ),
      ...mapGetters(
        [
          'getListArray',
          'getCount',
          'getListArrayCount'
        ]
      )
    },
    created() {
      this.registerIs = this.register;
      this.sortingVue = this.sorting;
      this.countList = this.count;
    }
  }
</script>

<style lang="scss">
  #app {

    .checkbox-btn {
      display: inline-block;
      margin: 0 5px 0 0;
      user-select: none;
      position: relative;

      input[type=checkbox] {
        z-index: -1;
        opacity: 0;
        display: block;
        width: 0;
        height: 0;

        &:checked + span {
          background: rgba(0, 123, 255, .25);
        }
      }

      span {
        display: inline-block;
        cursor: pointer;
        padding: 0 10px;
        line-height: 30px;
        border: 1px solid #999;
        border-radius: 4px;
        transition: background 0.2s ease;
      }

      &:hover {
        color: #666;
      }
    }

    .radio-btn {
      input[type=radio] {
        display: none;

        &:checked + label {
          background: rgba(0, 123, 255, .25);
        }
      }

      label {
        display: inline-block;
        cursor: pointer;
        padding: 0 10px;
        line-height: 34px;
        border: 1px solid #999;
        border-radius: 6px;
        user-select: none;
      }

      label:hover {
        color: #666;
      }
    }

    .error-alert {
      color: red;
    }

  }
</style>
