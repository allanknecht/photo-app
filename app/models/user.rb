class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :confirmable
  has_one :payment
  accepts_nested_attributes_for :payment
  has_many :images
end
