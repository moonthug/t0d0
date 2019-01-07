const HttpClient = require('../lib/http-client');

export default class Todoist {
  /**
   *
   * @param {String} token
   * @param {String} [baseURL='https://beta.todoist.com/API/v8'] baseURL
   */
  constructor(token, baseURL = 'https://beta.todoist.com/API/v8') {
    this.httpClient = new HttpClient();
    this.baseURL = baseURL;
    this.token = token;
  }

  /**
   * @inheritDoc https://doist.github.io/todoist-api/rest/v8/#projects
   *
   * @async
   * @param {Object} [params={}] params
   * @returns {Promise<void>}
   */
  async getProjects(params = {}) {
    return this.get(`/projects`, { params });
  }

  /**
   * @inheritDoc https://doist.github.io/todoist-api/rest/v8/#tasks
   *
   * @async
   * @param {Object} [params={}] params
   * @returns {Promise<void>}
   */
  async getTasks(params = {}) {
    return this.get(`/tasks`, { params });
  }

  /**
   * @inheritDoc https://doist.github.io/todoist-api/rest/v8/#tasks
   *
   * @async
   * @param {String|Number} projectId
   * @param {Object} [params={}] params
   * @returns {Promise<void>}
   */
  async getTasksByProjectId(projectId, params = {}) {
    params = { ...params, project_id: projectId };
    return this.getTasks(params);
  }

  /**
   *
   * @param {String} path
   * @param {Object} options
   * @returns {Promise<void>}
   */
  async get(path, options) {
    return this.request('get', path, options);
  }

  /**
   *
   * @param {String} method
   * @param {String} path
   * @param {Object} options
   * @returns {Promise<void>}
   */
  async request(method, path, options) {
    const url = `${this.baseURL}${path}`;

    options.headers = {
      Authorization: `Bearer ${this.token}`,
      ...options.headers
    };

    return this.httpClient.request(method, url, options);
  }
}
