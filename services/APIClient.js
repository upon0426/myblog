class APIClient {
    constructor() {
      this.blogs = [
        'Please start bloging',
      ];
    }
  
    getBlogs() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(this.blogs);
        }, 1000);
      });
    }
  
    createBlog(blog) {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.blogs.push(blog);
          resolve();
        }, 1000);
      });
    }
  
    deleteBlog(blog) {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.blogs = this.blogs.filter((value) => value != blog);
          resolve();
        }, 1000);
      });
    }
  }
  
  export default APIClient;
  