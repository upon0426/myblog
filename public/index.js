import { getBlogs, createBlog, deleteBlog } from '../services/Firestore';
import './index.css';

class BlogList {
    constructor() {
        this.list = document.querySelector('#blog-list ul');
        this.form = document.forms['add-blog'];
        this.addInput = document.querySelector('#add-input');
        this.hideBox = document.querySelector('#hide');
        this.searchBar = document.forms['search-blogs'].querySelector('input');
        this.bindEvents();
        this.render();
    }

    bindEvents() {
        this.list.addEventListener('click', this.onDeleteButtonClick.bind(this));
        this.list.addEventListener('click', this.onNameClick.bind(this));
        this.form.addEventListener('submit', this.onSubmit.bind(this));
        this.hideBox.addEventListener('change', this.onHideBoxChange.bind(this));
        this.searchBar.addEventListener('keyup', this.onSearchBarChange.bind(this));
    }
    
    async onNameClick(e) {
      if (e.target.className == 'name') {
        if (e.target.parentNode.lastElementChild.style.display == 'none') {
          e.target.parentNode.lastElementChild.style.display = 'block';
        } else {
          e.target.parentNode.lastElementChild.style.display = 'none';
        }
      console.log('aaaa');
      }
    }
  

    async onDeleteButtonClick(e) {
      if (e.target.className == 'delete') {
      const blogId = e.target.dataset.id;
      await deleteBlog(blogId);
      this.render();
      }
    }

    
  async onSubmit(e) {
    e.preventDefault();
    const { value } = this.addInput;
    await createBlog(value);
    this.addInput.value = '';
    this.render();
  }

  onHideBoxChange(e) {
    if (this.hideBox.checked) {
      this.list.style.display = 'none';
    } else {
      this.list.style.display = 'initial';
    }
  }

  onSearchBarChange(e) {
    const term = e.target.value.toLowerCase();
    const blogs = this.list.getElementsByTagName('li');
    Array.from(blogs).forEach((blog) => {
      const title = blog.firstElementChild.textContent;
      if (title.toLowerCase().indexOf(term) != -1) {
        blog.style.display = 'block';
      } else {
        blog.style.display = 'none';
      }
    });
  }

  async render() {
    const blogs = await getBlogs();
    let lis = '';
    blogs.forEach((blog) => lis += `<li><span class="name"><i class="fa fa-chevron-right fa-fw"></i>${blog.title}</span><span class="delete" data-id=${blog.id}>delete</span><p class="detail">aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p></li>`);
    this.list.innerHTML = lis;
  }
}

const blogList = new BlogList();
