class GroupsController < ApplicationController
  def index
    render json: Group.all, status: :ok
  end

  def show
    group = Group.find params[:id]
    render json: group, status: :ok
  end

  def create
    group = Group.new(default_params)
    if group.save
      render json: group, status: :created
    else
      render json: { errors: group.errors }, status: :unprocessable_entity
    end
  end

  def update
    group = Group.find(params[:id])
    if group.update(default_params)
      render json: group, status: :ok
    else
      render json: { errors: group.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    group = Group.find(params[:id])
    group.destroy
    head 204
  end

  private
  def default_params
    params.require(:group).permit(:name)
  end
end
