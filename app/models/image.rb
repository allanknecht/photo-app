class Image < ActiveRecord::Base
  belongs_to :user
  mount_uploader :picture, PictureUploader
  validates :name, presence: true
  validates :picture, presence: true
  validate :picture_size
end

private

def picture_size
  if picture.size > 5.megabytes
    errors.add(:picture, "should be less than 5MB")
  end
end
