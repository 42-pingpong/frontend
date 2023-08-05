{
  /*
	levelOfPublicity: public, protected, private 로 일단 저장
	ownerId: 까지는 뽑아내서 보낼 수 있는데 멤버들은 닉네임 배열로 보내야 할 것 가타여
	
	public: chatName, levelOfPublicity, maxParticipants, ownerId, members
	protected: chatName, password, levelOfPublicity, maxParticipants, ownerId, members
	private: chatName, levelOfPublicity, ownerId

	완전필수: chatName, levelOfPublicity, ownerId
	외엔 옵셔널로 받아야 할 것 가타여 ~
*/
}

export interface CreateGroupchatDto {
  chatName: string;
  password: string;
  levelOfPublicity: string;
  maxParticipants: number;
  ownerId: number;
  //   memebers: string[];
}
