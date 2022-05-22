class SessionsController < ApplicationController
    skip_before_action :authenticate_user!, only: :create

    def create
        user = User.find_by!(email: params[:email])
        if user#&.valid_password?(params[:password])
            session[:user_id] = user.id
            render json: user, status: :created
        else
            render json: {error: "Invalid username or password hi mom"}, status: :unauthorized
        end
    end

    def destroy
        if session[:user_id]
            session.delete :user_id
            head :no_content
            # render json: {}, status: 204
        else
            render json: {errors: ["No user currently logged in"]}, status: 401
        end
    end
end
