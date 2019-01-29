from neo4j import GraphDatabase

uri = "bolt://localhost:7687"
driver = GraphDatabase.driver(uri, auth=("neo4j", "cavallorosso"))

# list of users by nanem
users = []
# list of tracks by title
tracks = []

# Create follower
def create_follower(tx, user, followed):
	tx.run("MATCH (a:User), (b:User) WHERE a.name = {user} AND b.name = {followed} CREATE (a)-[r:FOLLOW]->(b) RETURN r",user=user, followed=followed)

# Initialize users
def read_user(tx):
	users_name = tx.run("MATCH (n:User) RETURN n.name")
	for x in users_name:
		users.append(x[0])

# Create buyed
def create_buyed(tx, user, track):
	tx.run("MATCH (a:User), (b:Track) WHERE a.name = {user} AND b.title = {track} CREATE (a)-[r:BUYED]->(b) RETURN r", user=user, track=track)

# Initialize tracks
def read_track(tx):
	tracks_title = tx.run("MATCH (n:Track) RETURN n.title")
	for x in tracks_title:
		tracks.append(x[0])
		

if __name__ == "__main__":
	with driver.session() as session:
		session.read_transaction(read_user)
		session.read_transaction(read_track)
		
		for index, user in enumerate(users):
			followed = users[0:index+1][:-1]
			[session.write_transaction(create_follower, user, x)  if user != x else print(x) for x in followed]
			[session.write_transaction(create_buyed, user, track) for track in tracks[0:index+1]]
		
			

