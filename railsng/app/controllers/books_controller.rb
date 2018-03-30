class BooksController < ApplicationController
  before_action :set_book, only: [:show, :update, :destroy]

  # GET /books
  def index
    @books = Book.joins("INNER JOIN categories ON categories.id = books.id_categories ").select("books.id, books.name, books.remark, categories.name as category,id_categories")

    render json: @books
  end

  # GET /books/1
  def show
    render json: @book
  end

  # POST /books
  def create
    @book = Book.new(book_params)

    if @book.save
      render json: @book, status: :created, location: @book
    else
      render json: @book.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /books/1
  def update
    if @book.update(book_params)
      render json: @book
    else
      render json: @book.errors, status: :unprocessable_entity
    end
  end

  # DELETE /books/delete/1
  def delete
    Book.where(id: params[:uri_segment1]).delete_all
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_book
      @book = Book.joins("INNER JOIN categories ON categories.id = books.id_categories ").select("books.id, books.name, books.remark, categories.name as category, id_categories").find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def book_params
      params.require(:book).permit(:name, :id_categories, :remark)
    end
end
