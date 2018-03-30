Rails.application.routes.draw do
  resources :categories
  resources :books
  
  root 'books#index'

  post 'books/create'   				=> 'books#create'
  get  'books/:uri_segment1'    		=> 'books#set_book'
  post 'books/update/:uri_segment1'    	=> 'books#update'
  get  'books/delete/:uri_segment1'     => 'books#delete'

  get  'categories/:uri_segment1'    	=> 'categories#set_category'
  post 'categories/create'   			=> 'categories#create'
  post 'categories/update/:uri_segment1'=> 'categories#update'
  get  'categories/delete/:uri_segment1'=> 'categories#delete'

end
