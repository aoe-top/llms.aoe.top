# Generating UHT compatible headers | 小莫的维基库

Source: https://wiki.aoe.top/ModTutorial/UE4SS/guides/generating-uht-compatible-headers.html
Friendly site: 小莫Wiki
Group: AOE.TOP
Fetched: 2026-06-18T02:26:59.269Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 小莫的wiki库,记录一些有用的合集

## Content

# Generating UHT compatible headers ​

## Supported versions ​

While the UHT header generator is only officially supported in 4.25+ , it has worked for older game versions (tested on 4.18.3 ; 4.17 (has some default property issues that should be fixed soon)). It also works for 5.0+ .

## How to use ​

The key bind to generate headers is by default CTRL + Numpad 9 , and it can be changed in Mods/Keybinds/Scripts/main.lua .

To utilize the generated headers to their full potential, see UE4GameProjectGenerator by Archengius (link to Buck's fork because of a couple fixes that Arch is too lazy to merge).

The project generator will only compile for UE versions 4.22 and higher. Engine customizations by developers may lead to unexpected results. If generating a project for an engine version older than 4.22 , generate it by compiling the project generator for 4.22 or higher first.

Before compiling the projectgencommandlet, open GameProjectGenerator.uproject and your game's pluginmanifest or .uproject and add any default engine plugins used by the game or plugins that the game uses and you found open source or purchased (it is not recommended to include purchased plugins in a public uproject) to the commandlet's uproject file.

After compiling the commandlet and running it on your game files, simply change the engine version in the generated .uproject to the correct engine version for your game.

This commandlet (by Spuds) will enter the CLI commands for the project gen for you, and make a batch file to regenerate with the same settings (e.g., to regenerate after a major game update).

## Possible inaccurate generation issues: ​

UE4SS has two different types of generators, a UHT compatible generator and what's called a CXX generator.

The UHT compatible generator is what's used when creating a .uproject file with the UE4GameProjectGenerator, and the CXX generator is a very shoddily made generator that doesn't generate UHT macros or proper #include statements but it does generate headers for core UE classes which the UHT generator doesn't.

Note the UE4SS CXX dumps do not currently have accurate padding. An SDK dump generated from another source may be a better source for determining the below corrections if it generates with correct padding, particularly for the bitfield checks.

Certain default properties may not generate correctly in older engine versions. For example, SoftObjectProperty was called AssetObjectProperty and SoftClassProperty was AssetClassProperty in < 4.17 . It is recommended to also generate an SDK/CXX dump to check for those properties and correct them in your project.

Bitfields will always generate as uint8 . However, they may actually be declared as uint32 in the original source. You can try to determine the actual size based on the CXX/SDK dump to correct these. In a CXX dump the bitfields will show the same offset. If there are multiple bitfields at the same offset and the next property is 4 bytes after that offset, then the bitfield should be changed to uint32.

## Instructions for possible errors you may encounter ​

These are some general instructions of how to generate a project and it also covers a few errors that you are likely to encounter.

The following errors & solutions is what was found when generating projects for various games.

Note that you can check here for solutions even if your game isn't listed below. Error lists compiled by Buckminsterfullerene, CheatingMuppet, Narknon & Blubb.

### Inherited Virtuals ​

UE4SS is unable to generate inherited virtuals if they are unreflected. This is often the source of LNK2001: unresolved external symbol errors, particularly when a class inherits from an interface. The build log is often not helpful for determining which file needs these virtuals.

To determine the file that they need to be added to, search for the virtual function listed in the error or for the class of the function in the engine, e.g., Module.AkAudio.cpp.obj : error LNK2001: unresolved external symbol "public: virtual class FString const __cdecl UInterpTrack::GetEdHelperClassName(void)const you could search for GetEdHelperClassName or UInterpTrack . Find the parent function and then find any classes within your project that inherit from same. Ideally find a sample of another class that inherits those virtuals within the engine on which to base your fixes, and copy the implementations from same into your affected project files, being sure to change the class name to match the class in your project.

You typically will also want to delete the logic in the implementations to simply return the correct type of data or "null" without actually running any logic.

### Game Target Generation ​

The project gen commandlet does not generate a game target file. Copy and duplicate your GameNameEditor.target.cs file in the same location. Remove Editor from the name. Open the file and delete "Editor" in the red crossed locations, and replace "Editor" with "Game" in the highlighted location.

### Deep Rock Galactic ​

========================== First do: ==========================
Generate project using commandlet
Then open it in Rider/VS.

========================== Then do, in no particular order: ==========================
Find out what version of mod.io game currently uses. At time of writing it is https://github.com/modio/modio-ue4/releases/tag/v2.16.1792. Delete the existing 'Modio' folder first. Paste the 'Modio', 'ModioTests' and 'ThirdParty' folders from this into Plugins/Modio/Source, replacing the existing 'Modio' folder. Do not replace the .uplugin file. Delete the ModioEx section form the .uplugin file instead.

In:
- CharacterSightSensor.h, FCharacterSightSensorDelegates
DECLARE_DYNAMIC_MULTICAST_DELEGATE(FCharacterSightSensorDelegate);
- FSDProjectileMovementComponent.h top delegates
DECLARE_DYNAMIC_MULTICAST_DELEGATE(FOnProjectilePenetrateDelegate);
DECLARE_DYNAMIC_MULTICAST_DELEGATE(FOnProjectileOutOfPropulsion);
Add the macro DECLARE_DYNAMIC_MULTICAST_DELEGATE(<\DelegateName>); above the UCLASS

In:
- SubHealthComponent.h, line 56
- HealthComponentBase.h, line 117
- HealthComponent.h, line 98
- EnemyHealthComponent.h, line 39
- FriendlyHealthComponent.h, line 33
Comment out UFUNCTION

Errors that look like this: "ActorFunctionLibrary.gen.cpp(153): [C2664] 'void UActorFunctionLibrary::DissolveMaterials(UObject *,const UMeshComponent *&,float)': cannot convert argument 2 from 'UMeshComponent *' to 'const UMeshComponent *&'":
Remove the const before the arguments that have the error (remember to also remove them in the definition stub too)
OR use this regex string (const) ((\w+)\*\&) and replace with $2

In "ShowroomStage.cpp" inside of the implementation of the constructor, comment out "this->SceneCapture = CreateDefaultSubobject<\USceneCaptureComponent2D>(TEXT("SceneCapture"));"

Set supported platforms to windows

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30

### cyubeVR ​

Add the following 4 lines in the "Plugins" section in the generated "cyubeVR.uproject":
{
"Name": "ChaosEditor",
"Enabled": false
}

Copy and paste the cyubeVREditor.Target.cs file (inside Source folder) and name it cyubeVRGame.Target.cs. Then replace any mentions of "editor" and replace with "game" inside of this new file

Right click generated project and open with IDE (e.g. Rider)

Comment out UFUNCTION() in ReceiveLightActor.h
- UseActorCustomLocation
- GetActorCustomLocation

Set the "_MAX UMETA(Hidden)," to "_MAX = 0xFF UMETA(Hidden)," in:
- EUGCMatchingUGCTypeBP.h
- EItemPreviewTypeBP.h

Remove the constructor from IpNetDriverUWorks.h and cpp files.

Remove TEnumAsByte<> (but not the type inside of it) in:
- OnInput inside VRGripInterface.h
- OnEndPlay inside VRGripScriptBase.h and its _Implementation version in the .cpp file
- SetMobilityAllEvent inside DeerCPP.h and its _Implementation version in the .cpp file

Then right click the .uproject and hit "regenerate solution files".

If you get the "failed to create version memory for PCH" errors when trying to build or pack, do it again.

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28

### Game 3 ​

Error 1
In an Enum class:
System.ArgumentException - String cannot contain a minus sign if the base is not 10.

Fix:
Remove the BlueprintType meta tag and the uint8 override on the enum ': uint8'.

Error 2
Unable to find 'class', 'delegate', 'enum', or 'struct' with name 'XYZ', where XYZ is an FStruct used within a class with no separate UStruct declaration.

Fix:
DECLARE_DYNAMIC_MULTICAST_DELEGATE(XYZ); , close to the Top of header Files.

Error 3
"is not supported by blueprint."

Fix:
-> Remove BlueprintReadWrite
-> or Remove BlueprintCallable

Error 4
cannot instantiate abstract class

fix:

cpp looks like:

UAbilitySystemComponent* AActorWithGAS::GetAbilitySystemComponent() const {
return nullptr;
}

Go to Header File and add:

UAbilitySystemComponent* GetAbilitySystemComponent() const override;

Error 5
modifiers not allowed on static member functions

Fix:
Remove the modifier, like "const"

Example:
static TSoftObjectPtr<Test> SomeFunction(some args) const; <- remove const

In both h and cpp File.

Error 6
'AAkAMbientSound' no appropriate default consturctor available.

Fix:
-------
Header File
-------
AkAmbientSound();

->

AkAmbientSound(const class FObjectInitializer& ObjectInitializer);

-------
CPP File
-------
AkAmbientSound::AkAmbientSound() {
this->AkEvent = NULL;
}

->

AkAmbientSound::AkAmbientSound(const class FObjectInitializer& ObjectInitializer) : Super(ObjectInitializer) {
this->AkEvent = NULL;
}

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76

### Astro Colony ​

========================== First do: ==========================
Generate project using commandlet
Then open it in Rider/VS.

========================== Then do, in no particular order: ==========================
Copy the EditorTarget file, rename it to AstroColonyGame.Target, and inside of it change target type to Game

In:
- VoxelPhysicsPartSpawner_VoxelWorlds.h, FConfigureVoxelWorld;
- TGNamedSlot.h, FOnNamedSlotAdded/Removed
- EHLogicObject.h, FOnSelectedResourcesChanged
- EHSignalObject.h, FOnResourcesSignalOutChanged/FOnSelectedDeviceChanged
- EHInteractableServiceObject, FOnAIInsideChanged
- EHModsBrowsedOptionViewModel, FOnInstalProgressChanged/FOnInstalCompleted
- EHSaveLoadListViewModel, FOnScenarioDetailsUpdated
- EHTrainingObject, FOnTrainedChanged
- EHSchoolObject, FOnAwaitingSpecialistTrainingsChange
- EHSignalReceiver, FOnSignalSendChanged
- EHModsListViewModel, FOnModsOptionSelected
- EHSignalNetwork, FOnSignalChanged
- AbilityAsync_WaitGameplayTagAdded, FAsyncWaitGameplayTagDelegate (put it inside of AbilityAsync_WaitGameplayTag)
Add the macro DECLARE_DYNAMIC_MULTICAST_DELEGATE(<\DelegateName>); above the UCLASS

In:
- AbilityAsync_WaitGameplayTagRemoved.h
- AbilityAsync_WaitGameplayTagAdded.h
Remove the UAbilityAsync_WaitGameplayTag:: from the front of each member

In EHSummaryViewModel.h add #include "EHSaveLoadListViewModel.h"

In:
- MaterialExpressionBlendMaterialAttributesBarycentric.h (every property)
- MaterialExpressionUnpack.h (FExpressionInput Input)
- GameplayCueInterface.h (ForwardGameplayCueToParent)
remove BlueprintReadWrite/BlueprintCallable (where appropriate) flag from the 'UPROPERTY' macro.

In MaterialPackInput.h, add #include "MaterialExpressionIO.h" and remove BlueprintReadWrite flag from the 'UPROPERTY' macro for FExpressionInput Input;

In EAbilityTaskWaitState.h, add None = 0 to the enum

In:
- AbilityTask.h/.cpp
- UMovieSceneGameplayCueTriggerSection
- UMovieSceneGameplayCueSection
comment out the constructor/definition

In AbilitySystemComponent.h/.cpp, comment out:
- The constructor
- ServerSetReplicatedEventWithPayload
- ServerSetReplicatedEvent
- ClientSetReplicatedEvent

In EHBaseButtonWidget.h, add:
#include "Components/HorizontalBox.h"
#include "Components/BackgroundBlur.h"
#include "Components/SizeBox.h"
then remove the forward declarations for UHorizontalBox, UBackgroundBlur, USizeBox.
Then comment out
UFUNCTION(BlueprintImplementableEvent)
void OnInputControllerChanged(TEnumAsByte<ETGInputControllerType> InputControllerType);

In:
- EHPlanetoidDestructibleItem.h
- EHPlanetoidVisualItem.h (also remove array from SpawnDensity)
- EHGridComponent.h, BillboardTextures
- EHHUDGame.h, PopMenuClasses/HUDMenuClasses (also change GetPopMenuClass return type)
- EHScenarioParams.h, TerrainTypeSpawnChances/ShapeTypeSpawnChances
- EHDataProvider.h, every array
replace the array decleration with TArray<> and add BlueprintReadWrite+other normal flags to the 'UPROPERTY' macro. Then update the .cpp constructor.

In VoxelProceduralMeshComponent.h/.cpp, add the UPrimitiveComponent interface, i.e. like this:
VoxelProceduralMeshComponent.h:
#pragma once
#include "CoreMinimal.h"
#include "Components/ModelComponent.h"
#include "VoxelIntBox.h"
#include "VoxelProceduralMeshComponent.generated.h"

class UBodySetup;
class UStaticMeshComponent;
class AVoxelWorld;
class UModelComponent;

UCLASS(Blueprintable, ClassGroup=Custom, meta=(BlueprintSpawnableComponent))
class VOXEL_API UVoxelProceduralMeshComponent : public UModelComponent {
GENERATED_BODY()
public:
private:
UPROPERTY(BlueprintReadWrite, EditAnywhere, Transient, meta=(AllowPrivateAccess=true))
UBodySetup* BodySetup;

UPROPERTY(BlueprintReadWrite, EditAnywhere, Transient, meta=(AllowPrivateAccess=true))
UBodySetup* BodySetupBeingCooked;

UPROPERTY(BlueprintReadWrite, EditAnywhere, Export, Transient, meta=(AllowPrivateAccess=true))
UStaticMeshComponent* StaticMeshComponent;

public:
UVoxelProceduralMeshComponent(const FObjectInitializer& ObjectInitializer);
UFUNCTION(BlueprintCallable)
static void SetVoxelCollisionsFrozen(const AVoxelWorld* VoxelWorld, bool bFrozen);

UFUNCTION(BlueprintImplementableEvent)
void InitChunk(uint8 ChunkLOD, FVoxelIntBox ChunkBounds);

UFUNCTION(BlueprintCallable, BlueprintPure)
static bool AreVoxelCollisionsFrozen(const AVoxelWorld* VoxelWorld);

//~ Begin UPrimitiveComponent Interface.
virtual void CreateRenderState_Concurrent(FRegisterComponentContext* Context) override;
virtual void DestroyRenderState_Concurrent() override;
virtual bool GetLightMapResolution( int32& Width, int32& Height ) const override;
virtual int32 GetStaticLightMapResolution() const override;
virtual void GetLightAndShadowMapMemoryUsage( int32& LightMapMemoryUsage, int32& ShadowMapMemoryUsage ) const override;
virtual FBoxSphereBounds CalcBounds(const FTransform& LocalToWorld) const override;
virtual FPrimitiveSceneProxy* CreateSceneProxy() override;
virtual bool ShouldRecreateProxyOnUpdateTransform() const override;
#if WITH_EDITOR
virtual void GetStaticLightingInfo(FStaticLightingPrimitiveInfo& OutPrimitiveInfo,const TArray<ULightComponent*>& InRelevantLights,const FLightingBuildOptions& Options) override;
virtual void AddMapBuildDataGUIDs(TSet<FGuid>& InGUIDs) const override;
#endif
virtual ELightMapInteractionType GetStaticLightingType() const override { return LMIT_Texture; }
virtual void GetStreamingRenderAssetInfo(FStreamingTextureLevelContext& LevelContext, TArray<FStreamingRenderAssetPrimitiveInfo>& OutStreamingRenderAssets) const override;
virtual void GetUsedMaterials(TArray<UMaterialInterface*>& OutMaterials, bool bGetDebugMaterials = false) const override;
virtual class UBodySetup* GetBodySetup() override { return ModelBodySetup; };
virtual int32 GetNumMaterials() const override;
virtual UMaterialInterface* GetMaterial(int32 MaterialIndex) const override;
virtual UMaterialInterface* GetMaterialFromCollisionFaceIndex(int32 FaceIndex, int32& SectionIndex) const override;
virtual bool IsPrecomputedLightingValid() const override;
//~ End UPrimitiveComponent Interface.

//~ Begin UActorComponent Interface.
virtual void InvalidateLightingCacheDetailed(bool bInvalidateBuildEnqueuedLighting, bool bTranslationOnly) override;
virtual void PropagateLightingScenarioChange() override;
//~ End UActorComponent Interface.

//~ Begin UObject Interface.
virtual void Serialize(FArchive& Ar) override;
virtual void PostLoad() override;
virtual bool IsNameStableForNetworking() const override;
#if WITH_EDITOR
virtual void PostEditUndo() override;
#endif // WITH_EDITOR
static void AddReferencedObjects(UObject* InThis, FReferenceCollector& Collector);
//~ End UObject Interface.

//~ Begin Interface_CollisionDataProvider Interface
virtual bool GetPhysicsTriMeshData(struct FTriMeshCollisionData* CollisionData, bool InUseAllTriData) override;
virtual bool ContainsPhysicsTriMeshData(bool InUseAllTriData) const override;
virtual bool WantsNegXTriMesh() override { return false; }
//~ End Interface_CollisionDataProvider Interface

//#if WITH_EDITOR
/**
* Generate the Elements array.
*
* @param bBuildRenderData If true, build render data after generating the elements.
*
* @return bool true if successful, false if not.
*/
virtual bool GenerateElements(bool bBuildRenderData);
//#endif // WITH_EDITOR
};

VoxelProceduralMeshComponent.cpp:
#include "VoxelProceduralMeshComponent.h"

class AVoxelWorld;

void UVoxelProceduralMeshComponent::SetVoxelCollisionsFrozen(const AVoxelWorld* VoxelWorld, bool bFrozen) {

}

bool UVoxelProceduralMeshComponent::AreVoxelCollisionsFrozen(const AVoxelWorld* VoxelWorld) {
return false;
}

UVoxelProceduralMeshComponent::UVoxelProceduralMeshComponent(const FObjectInitializer& ObjectInitializer)
: Super(ObjectInitializer)
{
this->BodySetup = NULL;
this->BodySetupBeingCooked = NULL;
this->StaticMeshComponent = NULL;
}

void UVoxelProceduralMeshComponent::AddReferencedObjects(UObject* InThis, FReferenceCollector& Collector)
{
/*UVoxelProceduralMeshComponent* This = CastChecked<UVoxelProceduralMeshComponent>(InThis);
Collector.AddReferencedObject( This->StaticMeshComponent, This );
AddReferencedObjects( This, Collector );*/
}

void UVoxelProceduralMeshComponent::Serialize(FArchive& Ar)
{
/*Serialize(Ar);

Ar << StaticMeshComponent;*/
}

void UVoxelProceduralMeshComponent::PostLoad()
{
/*PostLoad();

// Fix for old StaticMeshComponent components which weren't created with transactional flag.
SetFlags( RF_Transactional );

// BuildRenderData relies on the StaticMeshComponent having been post-loaded, so we ensure this by calling ConditionalPostLoad.
check(StaticMeshComponent);
StaticMeshComponent->ConditionalPostLoad();*/

}

bool UVoxelProceduralMeshComponent::IsNameStableForNetworking() const
{
// UVoxelProceduralMeshComponent is always persistent for the duration of a game session, and so can be considered to have a stable name
return true;
}

void UVoxelProceduralMeshComponent::GetUsedMaterials(TArray<UMaterialInterface*>& OutMaterials, bool bGetDebugMaterials) const
{

}

int32 UVoxelProceduralMeshComponent::GetNumMaterials() const
{
return 0;
}

UMaterialInterface* UVoxelProceduralMeshComponent::GetMaterial(int32 MaterialIndex) const
{
UMaterialInterface* Material = nullptr;

return Material;
}

UMaterialInterface* UVoxelProceduralMeshComponent::GetMaterialFromCollisionFaceIndex(int32 FaceIndex, int32& SectionIndex) const
{
UMaterialInterface* Result = nullptr;
SectionIndex = 0;
return Result;
}

bool UVoxelProceduralMeshComponent::IsPrecomputedLightingValid() const
{
return false;
}

void UVoxelProceduralMeshComponent::GetStreamingRenderAssetInfo(FStreamingTextureLevelContext& LevelContext, TArray<FStreamingRenderAssetPrimitiveInfo>& OutStreamingRenderAssets) const
{

}

void UVoxelProceduralMeshComponent::CreateRenderState_Concurrent(FRegisterComponentContext* Context)
{

}

void UVoxelProceduralMeshComponent::DestroyRenderState_Concurrent()
{

}

FPrimitiveSceneProxy* UVoxelProceduralMeshComponent::CreateSceneProxy()
{
return NULL;
}

bool UVoxelProceduralMeshComponent::ShouldRecreateProxyOnUpdateTransform() const
{
return true;
}

FBoxSphereBounds UVoxelProceduralMeshComponent::CalcBounds(const FTransform& LocalToWorld) const
{
return FBoxSphereBounds(LocalToWorld.GetLocation(), FVector::ZeroVector, 0.f);
}

void UVoxelProceduralMeshComponent::InvalidateLightingCacheDetailed(bool bInvalidateBuildEnqueuedLighting, bool bTranslationOnly)
{

}

void UVoxelProceduralMeshComponent::PropagateLightingScenarioChange()
{

}

bool UVoxelProceduralMeshComponent::GetLightMapResolution( int32& Width, int32& Height ) const
{
return false;
}

int32 UVoxelProceduralMeshComponent::GetStaticLightMapResolution() const
{
/*int32 Width;
int32 Height;
GetLightMapResolution(Width, Height);

return FMath::Max<int32>(Width, Height);*/
return NULL;
}

void UVoxelProceduralMeshComponent::GetLightAndShadowMapMemoryUsage( int32& LightMapMemoryUsage, int32& ShadowMapMemoryUsage ) const
{
/*return;*/
}

#if WITH_EDITOR
void UVoxelProceduralMeshComponent::GetStaticLightingInfo(FStaticLightingPrimitiveInfo& OutPrimitiveInfo,const TArray<ULightComponent*>& InRelevantLights,const FLightingBuildOptions& Options)
{
/*check(0);*/
}

void UVoxelProceduralMeshComponent::AddMapBuildDataGUIDs(TSet<FGuid>& InGUIDs) const
{

}

void UVoxelProceduralMeshComponent::PostEditUndo()
{
/*PostEditUndo();*/
}
#endif // WITH_EDITOR

bool UVoxelProceduralMeshComponent::GetPhysicsTriMeshData(struct FTriMeshCollisionData* CollisionData, bool InUseAllTriData)
{
return false;
}

bool UVoxelProceduralMeshComponent::ContainsPhysicsTriMeshData(bool InUseAllTriData) const
{
return false;
}

bool UVoxelProceduralMeshComponent::GenerateElements(bool bBuildRenderData)
{
return false;
}

Set supported platforms to windows

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
95
96
97
98
99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
135
136
137
138
139
140
141
142
143
144
145
146
147
148
149
150
151
152
153
154
155
156
157
158
159
160
161
162
163
164
165
166
167
168
169
170
171
172
173
174
175
176
177
178
179
180
181
182
183
184
185
186
187
188
189
190
191
192
193
194
195
196
197
198
199
200
201
202
203
204
205
206
207
208
209
210
211
212
213
214
215
216
217
218
219
220
221
222
223
224
225
226
227
228
229
230
231
232
233
234
235
236
237
238
239
240
241
242
243
244
245
246
247
248
249
250
251
252
253
254
255
256
257
258
259
260
261
262
263
264
265
266
267
268
269
270
271
272
273
274
275
276
277
278
279
280
281
282
283
284
285
286
287
288
289
290
291
292
293
294
295
296
297
298
299
300
301
302
303
304
305
306
307
308
309
310
311
312
313
314
315
316
317
318
319
320
321
322
323
324
325
326
327
328
329
330
331
332
333
334
335
336
337
338
339
340
