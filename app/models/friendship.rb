class Friendship < ApplicationRecord
    belongs_to :user
    belongs_to :friend, class_name: 'User'
    # belongs_to :follower, foreign_key: "follower_id", class_name: "User"
    # belongs_to :followed, foreign_key: "followed_id", class_name: "User"
end
