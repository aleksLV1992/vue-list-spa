import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

/**
 * State VueX
 * @type {{search: null, sorting: string, listArray: [{main: boolean, id: number, title: string}, {main: boolean, id: number, title: string}], main: string, register: boolean}}
 */
const state = {
  listArray: [
    {
      id: 1,
      title: "1erry",
      main: false
    },
    {
      id: 2,
      title: "1uicy",
      main: true
    },
    {
      id: 3,
      title: "apricot",
      main: true
    },
    {
      id: 4,
      title: "Ashton",
      main: true
    },
    {
      id: 5,
      title: "banner",
      main: false
    },
    {
      id: 6,
      title: "bruce",
      main: false
    },
    {
      id: 7,
      title: "Bilgewater",
      main: false
    },
    {
      id: 8,
      title: "Blasphemous",
      main: false
    },
    {
      id: 9,
      title: "B3ach Boys",
      main: false
    },
    {
      id: 10,
      title: "Calzium",
      main: false
    },
    {
      id: 11,
      title: "Casablanca",
      main: true
    },
    {
      id: 12,
      title: "Constantine",
      main: false
    },
    {
      id: 13,
      title: "Citizen Kane",
      main: false
    }
  ],
  register: false,
  main: 'Nest',
  search: null,
  sorting: 'none',
  visibleList: false,
  count: 5
};

/**
 * Getter VueX
 * @type {{}}
 */
const getters = {
  getListArray(state, getters) {
    let empty = (f => f === null || f.length === 0);
    var listArray = state.listArray;

    // Поиск
    if (!empty(state.search)) {
      listArray = listArray.filter(item => {
        let search = state.search;
        let title = item.title;

        // Если поиск с учетом регистра
        if (!state.register) {
          search = search.toLocaleLowerCase();
          title = title.toLocaleLowerCase();
        }

        return title.includes(search);
      })
    }

    //Сортировка
    if (state.sorting !== 'none') {
      const s1 = (a, b) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      };

      const s2 = (a, b) => {
        if (a > b) return -1;
        if (a < b) return 1;
        return 0;
      };


      listArray = listArray.sort((a, b) => {

        if (state.sorting === 'descending')
          return s1(a.title, b.title);
        else
          return s2(a.title, b.title);
      });

    }

    // Дополнительная логика отображения

    return listArray;
  },
  getListArrayCount(state, getter) {
    if (state.visibleList) return getter.getListArray;
    return getter.getListArray.slice(0, state.count);
  },
  getCount(state, getters) {
    return getters.getListArray.length;
  }
};

/**
 * Mutations VueX
 * @type {{}}
 */
const mutations = {
  setSearch(state, s) {
    state.search = s;
  },
  setRegister(state, r) {
    state.register = r;
  },
  setSorting(state, s) {
    state.sorting = s;
  },
  seVisible(state, v) {
    state.visibleList = v;
  },
};

/**
 * Actions VueX
 * @type {{}}
 */
const actions = {
  updateSearch(context, s) {
    context.commit('setSearch', s);
  },
  updateRegister(context, r) {
    context.commit('setRegister', r);
  },
  updateSorting(context, s) {
    context.commit('setSorting', s);
  },
  updateVisible(context, v) {
    context.commit('seVisible', v);
  }
};

/**
 * Store
 */
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
