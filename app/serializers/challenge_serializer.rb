class ChallengeSerializer < ActiveModel::Serializer
  attributes :id, :drawing_id, :challenge_title

  belongs_to :drawing
  has_many :attempts

end
