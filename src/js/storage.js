class Storage {
  // storage.function(set|get|del, key, value = null);
  appData(action, key, value = null) {
    if (action === "set") {
      localStorage.setItem(key + ".dat", value);
      return true;
    } else if (action === "get") {
      return localStorage.getItem(key + ".dat") ?? value;
    } else if (action === "del") {
      localStorage.removeItem(key + ".dat");
    } else {
      throw new Error("Invalid action: Use 'set' or 'get'");
    }
  }

  appConfig(action, key, value = null) {
    if (action === "set") {
      localStorage.setItem(key + ".cfg", value);
      return true;
    } else if (action === "get") {
      return localStorage.getItem(key + ".cfg") ?? value;
    } else if (action === "del") {
      localStorage.removeItem(key + ".cfg");
    } else {
      throw new Error("Invalid action: Use 'set' or 'get'");
    }
  }

  dataBackup(action, key, value = null) {
    if (action === "set") {
      localStorage.setItem(key + ".bak", value);
      return true;
    } else if (action === "get") {
      return localStorage.getItem(key + ".bak") ?? value;
    } else if (action === "del") {
      localStorage.removeItem(key + ".bak");
    } else {
      throw new Error("Invalid action: Use 'set' or 'get'");
    }
  }

  fullData(action) {
    if (action === "reset") {
      localStorage.clear();
    } else if (action === "backup") {
      // not available right now
    }
  }

  // appCache functions for sessionStorage
  appCache(action, key, value = null) {
    if (action === "set") {
      sessionStorage.setItem("__" + key, value);
      return true;
    } else if (action === "get") {
      return sessionStorage.getItem("__" + key) ?? value;
    } else if (action === "del") {
      sessionStorage.removeItem("__" + key);
    } else {
      throw new Error("Invalid action: Use 'set' or 'get'");
    }
  }

  fullCache(action) {
    if (action === "reset") {
      sessionStorage.clear();
    } else if (action === "backup") {
      // not available right now
    }
  }
}

const storage = new Storage();