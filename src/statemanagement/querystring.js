export default class QueryString {
  static set(string) {
    window.history.replaceState({}, '', `?${string}`);
  }

  static get() {
    return window.location.search.replace('?', '');
  }
}
