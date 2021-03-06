class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
        :recoverable, :rememberable, :validatable, :authentication_keys => [:username]
  
  validates :email, uniqueness: true
  validates :username, uniqueness: true

  has_many :drawings, -> {order(:created_at => :desc)}

  has_many :friendships, dependent: :destroy
  has_many :friends, through: :friendships

  def create
    user = User.create(user_params)
    if user.valid?
        render json: user, status: :created
    else 
        render json: {errors: user.errors.full_messages}, status: :unprocessable_entity
    end
  end

  # def friends
  #   all_friends = self.followeds + self.followers
  #   all_friends
  # end

  private 

  def user_params
      params.permit(:username, :password, :password_confirmation, :email)
  end
end
